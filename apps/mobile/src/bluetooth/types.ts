export type ScaleAdapterId =
  | "bookoo-themis-ultra"
  | "mock"
  | "manual"
  | (string & {});

export type ScaleConnectionState =
  | "idle"
  | "scanning"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export type StabilityState = "stable" | "unstable" | "unknown";

export type ScaleDevice = {
  id: string;
  name: string | null;
  rssi?: number | null;
  adapterId: ScaleAdapterId;
  adapterLabel: string;
  isLikelySupported: boolean;
};

export type ScaleReading = {
  grams: number;
  stable: boolean;
  source: ScaleAdapterId;
  rawPayload?: string;
  receivedAt: string;
};

export type ScaleCapabilities = {
  hardwareTare: boolean;
  appZero: boolean;
  batteryLevel: boolean;
  rawPayloadLog: boolean;
};

export interface ScaleAdapter {
  id: ScaleAdapterId;
  label: string;
  capabilities: ScaleCapabilities;
  scan(): Promise<ScaleDevice[]>;
  connect(deviceId: string): Promise<void>;
  disconnect(): Promise<void>;
  tare(): Promise<void>;
  onWeightChange(callback: (reading: ScaleReading) => void): () => void;
  getConnectionState(): ScaleConnectionState;
}

export interface ManualReadingAdapter extends ScaleAdapter {
  setManualReading(grams: number): void;
}

export type DebugLogEntry = {
  id: string;
  timestamp: string;
  category: "system" | "scan" | "connection" | "raw" | "decoded" | "tare";
  message: string;
};

export type ScaleManagerState = {
  connectionState: ScaleConnectionState;
  bluetoothPermissionStatus: string;
  connectedDevice: ScaleDevice | null;
  discoveredDevices: ScaleDevice[];
  activeAdapterId: ScaleAdapterId | null;
  activeAdapterLabel: string;
  activeCapabilities: ScaleCapabilities | null;
  lastReading: ScaleReading | null;
  recentReadings: ScaleReading[];
  lastError: string | null;
  debugLogs: DebugLogEntry[];
  discoveredServices: string[];
  discoveredCharacteristics: string[];
  lastTareResult: string | null;
};
