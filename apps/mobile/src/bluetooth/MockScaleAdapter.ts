import {
  ScaleAdapter,
  ScaleCapabilities,
  ScaleConnectionState,
  ScaleDevice,
  ScaleReading,
} from "./types";

const MOCK_DEVICE_ID = "mock-dev-scale";

export class MockScaleAdapter implements ScaleAdapter {
  readonly id = "mock" as const;
  readonly label = "Mock/dev";
  readonly capabilities: ScaleCapabilities = {
    hardwareTare: false,
    appZero: true,
    batteryLevel: false,
    rawPayloadLog: true,
  };

  private connectionState: ScaleConnectionState = "idle";
  private callbacks = new Set<(reading: ScaleReading) => void>();
  private interval: ReturnType<typeof setInterval> | null = null;
  private readingIndex = 0;
  private readonly readings = [182.4, 182.1, 181.9, 181.7, 179.8, 179.6, 179.5];

  async scan(): Promise<ScaleDevice[]> {
    return [
      {
        id: MOCK_DEVICE_ID,
        name: "Development Mock Scale",
        rssi: null,
        adapterId: this.id,
        adapterLabel: this.label,
        isLikelySupported: false,
      },
    ];
  }

  async connect(deviceId: string): Promise<void> {
    if (deviceId !== MOCK_DEVICE_ID) {
      throw new Error("Unknown mock scale device.");
    }

    this.connectionState = "connected";
    this.startReadings();
  }

  async disconnect(): Promise<void> {
    this.connectionState = "disconnected";
    this.stopReadings();
  }

  async tare(): Promise<void> {
    throw new Error("Hardware tare is not available on the mock/dev source.");
  }

  onWeightChange(callback: (reading: ScaleReading) => void): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  getConnectionState(): ScaleConnectionState {
    return this.connectionState;
  }

  private startReadings(): void {
    this.stopReadings();
    this.emitReading();
    this.interval = setInterval(() => this.emitReading(), 1500);
  }

  private stopReadings(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private emitReading(): void {
    if (this.connectionState !== "connected") {
      return;
    }

    const grams = this.readings[this.readingIndex % this.readings.length];
    const stable = this.readingIndex % 4 !== 0;
    this.readingIndex += 1;

    const reading: ScaleReading = {
      grams,
      stable,
      source: this.id,
      rawPayload: `mock-dev:${grams.toFixed(1)}g:${stable ? "stable" : "unstable"}`,
      receivedAt: new Date().toISOString(),
    };

    this.callbacks.forEach((callback) => callback(reading));
  }
}
