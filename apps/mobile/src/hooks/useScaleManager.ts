import { useEffect, useState } from "react";

import { scaleManager } from "../bluetooth/ScaleManager";
import { ScaleDevice, ScaleManagerState } from "../bluetooth/types";

export function useScaleManager() {
  const [state, setState] = useState<ScaleManagerState>(scaleManager.getState());

  useEffect(() => scaleManager.subscribe(setState), []);

  return {
    state,
    scan: () => scaleManager.scan(),
    stopScan: () => scaleManager.stopScan(),
    connect: (device: ScaleDevice) => scaleManager.connect(device),
    disconnect: () => scaleManager.disconnect(),
    tare: () => scaleManager.tare(),
    zeroInApp: () => scaleManager.zeroInApp(),
    submitManualReading: (grams: number) => scaleManager.submitManualReading(grams),
    clearLogs: () => scaleManager.clearLogs(),
    getDebugText: () => scaleManager.getDebugText(),
  };
}
