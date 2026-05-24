import { ManualInputScaleAdapter } from "./ManualInputScaleAdapter";
import { MockScaleAdapter } from "./MockScaleAdapter";
import {
  DebugLogEntry,
  ManualReadingAdapter,
  ScaleAdapter,
  ScaleAdapterId,
  ScaleDevice,
  ScaleManagerState,
  ScaleReading,
} from "./types";

const maxReadings = 10;

const initialState: ScaleManagerState = {
  connectionState: "idle",
  bluetoothPermissionStatus: "Not requested in Phase 1 shell",
  connectedDevice: null,
  discoveredDevices: [],
  activeAdapterId: null,
  activeAdapterLabel: "None",
  activeCapabilities: null,
  lastReading: null,
  recentReadings: [],
  lastError: null,
  debugLogs: [],
  discoveredServices: ["Pending real BLE service discovery in Phase 2"],
  discoveredCharacteristics: ["Pending real BLE characteristic discovery in Phase 2"],
  lastTareResult: null,
};

export class ScaleManager {
  private state: ScaleManagerState = initialState;
  private readonly adapters: Map<ScaleAdapterId, ScaleAdapter>;
  private subscribers = new Set<(state: ScaleManagerState) => void>();
  private activeAdapter: ScaleAdapter | null = null;
  private unsubscribeReading: (() => void) | null = null;
  private appZeroOffsetGrams = 0;
  private scanToken = 0;

  constructor(adapters: ScaleAdapter[]) {
    this.adapters = new Map(adapters.map((adapter) => [adapter.id, adapter]));
  }

  getState(): ScaleManagerState {
    return this.state;
  }

  subscribe(callback: (state: ScaleManagerState) => void): () => void {
    this.subscribers.add(callback);
    callback(this.state);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  async scan(): Promise<void> {
    if (this.state.connectionState === "connecting") {
      return;
    }

    const token = this.scanToken + 1;
    this.scanToken = token;
    this.setState({
      connectionState: "scanning",
      lastError: null,
    });
    this.log("scan", "Scanning available Phase 1 sources. Real BLE scan starts in Phase 2.");

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (token !== this.scanToken) {
        return;
      }

      const deviceGroups = await Promise.all(
        Array.from(this.adapters.values()).map((adapter) => adapter.scan()),
      );

      if (token !== this.scanToken) {
        return;
      }

      this.setState({
        connectionState: this.state.connectedDevice ? "connected" : "idle",
        discoveredDevices: deviceGroups.flat(),
      });
    } catch (error) {
      this.fail(error);
    }
  }

  stopScan(): void {
    if (this.state.connectionState !== "scanning") {
      return;
    }

    this.scanToken += 1;
    this.setState({ connectionState: this.state.connectedDevice ? "connected" : "idle" });
    this.log("scan", "Scan stopped.");
  }

  async connect(device: ScaleDevice): Promise<void> {
    const adapter = this.adapters.get(device.adapterId);
    if (!adapter) {
      this.fail(new Error(`No adapter registered for ${device.adapterLabel}.`));
      return;
    }

    try {
      if (this.activeAdapter) {
        await this.disconnect();
      }

      this.setState({
        connectionState: "connecting",
        lastError: null,
      });

      this.log("connection", `Connecting to ${device.name ?? device.id} via ${device.adapterLabel}.`);
      await adapter.connect(device.id);

      this.activeAdapter = adapter;
      this.unsubscribeReading = adapter.onWeightChange((reading) => this.handleReading(reading));

      this.setState({
        connectionState: "connected",
        connectedDevice: device,
        activeAdapterId: adapter.id,
        activeAdapterLabel: adapter.label,
        activeCapabilities: adapter.capabilities,
        discoveredServices:
          adapter.id === "mock" || adapter.id === "manual"
            ? [`${adapter.label}: no real BLE services in Phase 1`]
            : ["Pending real BLE service discovery in Phase 2"],
        discoveredCharacteristics:
          adapter.id === "mock" || adapter.id === "manual"
            ? [`${adapter.label}: no real BLE characteristics in Phase 1`]
            : ["Pending real BLE characteristic discovery in Phase 2"],
      });

      this.log("connection", `Connected to ${device.name ?? device.id}.`);
    } catch (error) {
      this.fail(error);
    }
  }

  async disconnect(): Promise<void> {
    const adapter = this.activeAdapter;
    if (!adapter) {
      this.setState({
        connectionState: "disconnected",
        connectedDevice: null,
        activeAdapterId: null,
        activeAdapterLabel: "None",
        activeCapabilities: null,
        lastReading: null,
      });
      return;
    }

    try {
      this.unsubscribeReading?.();
      this.unsubscribeReading = null;
      await adapter.disconnect();
      this.log("connection", "Disconnected.");
      this.activeAdapter = null;
      this.appZeroOffsetGrams = 0;
      this.setState({
        connectionState: "disconnected",
        connectedDevice: null,
        activeAdapterId: null,
        activeAdapterLabel: "None",
        activeCapabilities: null,
        lastReading: null,
      });
    } catch (error) {
      this.fail(error);
    }
  }

  async tare(): Promise<void> {
    if (!this.activeAdapter || !this.state.activeCapabilities) {
      this.fail(new Error("Connect to a scale before sending tare."));
      return;
    }

    if (!this.state.activeCapabilities.hardwareTare) {
      const message = "Hardware tare unavailable for this source. Use Zero in app.";
      this.setState({
        lastError: message,
        lastTareResult: message,
      });
      this.log("tare", message);
      return;
    }

    try {
      await this.activeAdapter.tare();
      const message = "Tare command sent.";
      this.setState({ lastError: null, lastTareResult: message });
      this.log("tare", message);
    } catch (error) {
      this.fail(error);
    }
  }

  zeroInApp(): void {
    if (!this.state.lastReading) {
      this.fail(new Error("No live reading available to zero in app."));
      return;
    }

    this.appZeroOffsetGrams += this.state.lastReading.grams;
    const zeroedReading: ScaleReading = {
      ...this.state.lastReading,
      grams: 0,
      receivedAt: new Date().toISOString(),
    };
    this.pushReading(zeroedReading);
    this.log("tare", "Applied app-level zero from the latest reading.");
  }

  submitManualReading(grams: number): void {
    const adapter = this.activeAdapter;
    if (!adapter || adapter.id !== "manual") {
      this.fail(new Error("Connect the manual input source before submitting manual readings."));
      return;
    }

    (adapter as ManualReadingAdapter).setManualReading(grams);
  }

  clearLogs(): void {
    this.setState({ debugLogs: [] });
  }

  getDebugText(): string {
    return this.state.debugLogs
      .map((entry) => `${entry.timestamp} [${entry.category}] ${entry.message}`)
      .join("\n");
  }

  private handleReading(reading: ScaleReading): void {
    const adjustedReading = {
      ...reading,
      grams: reading.grams - this.appZeroOffsetGrams,
    };

    this.pushReading(adjustedReading);

    if (reading.rawPayload) {
      this.log("raw", reading.rawPayload);
    }

    this.log(
      "decoded",
      `${adjustedReading.grams.toFixed(1)} g, ${adjustedReading.stable ? "stable" : "unstable"}`,
    );
  }

  private pushReading(reading: ScaleReading): void {
    const recentReadings = [reading, ...this.state.recentReadings].slice(0, maxReadings);
    this.setState({
      lastReading: reading,
      recentReadings,
      lastError: null,
    });
  }

  private fail(error: unknown): void {
    const message = error instanceof Error ? error.message : "Unknown scale error.";
    this.setState({
      connectionState: "error",
      lastError: message,
    });
    this.log("system", message);
  }

  private log(category: DebugLogEntry["category"], message: string): void {
    const entry: DebugLogEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: new Date().toISOString(),
      category,
      message,
    };

    this.setState({
      debugLogs: [entry, ...this.state.debugLogs].slice(0, 80),
    });
  }

  private setState(nextState: Partial<ScaleManagerState>): void {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.subscribers.forEach((subscriber) => subscriber(this.state));
  }
}

export const scaleManager = new ScaleManager([
  new MockScaleAdapter(),
  new ManualInputScaleAdapter(),
]);
