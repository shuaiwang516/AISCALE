import {
  ManualReadingAdapter,
  ScaleCapabilities,
  ScaleConnectionState,
  ScaleDevice,
  ScaleReading,
} from "./types";

const MANUAL_DEVICE_ID = "manual-weight-entry";

export class ManualInputScaleAdapter implements ManualReadingAdapter {
  readonly id = "manual" as const;
  readonly label = "Manual fallback";
  readonly capabilities: ScaleCapabilities = {
    hardwareTare: false,
    appZero: false,
    batteryLevel: false,
    rawPayloadLog: false,
  };

  private connectionState: ScaleConnectionState = "idle";
  private callbacks = new Set<(reading: ScaleReading) => void>();

  async scan(): Promise<ScaleDevice[]> {
    return [
      {
        id: MANUAL_DEVICE_ID,
        name: "Manual weight entry",
        rssi: null,
        adapterId: this.id,
        adapterLabel: this.label,
        isLikelySupported: false,
      },
    ];
  }

  async connect(deviceId: string): Promise<void> {
    if (deviceId !== MANUAL_DEVICE_ID) {
      throw new Error("Unknown manual input source.");
    }

    this.connectionState = "connected";
  }

  async disconnect(): Promise<void> {
    this.connectionState = "disconnected";
  }

  async tare(): Promise<void> {
    throw new Error("Hardware tare is not available for manual input.");
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

  setManualReading(grams: number): void {
    if (this.connectionState !== "connected") {
      throw new Error("Connect the manual input source before submitting readings.");
    }

    const reading: ScaleReading = {
      grams,
      stable: true,
      source: this.id,
      receivedAt: new Date().toISOString(),
    };

    this.callbacks.forEach((callback) => callback(reading));
  }
}
