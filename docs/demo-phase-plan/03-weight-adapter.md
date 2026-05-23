# Phase 3: Weight Adapter

## Goal

Convert the BLE proof of concept into a reusable `BookooScaleAdapter` that emits
decoded weight readings in grams while preserving raw payload visibility for
debugging.

## Requirements

- Implement `BookooScaleAdapter` behind the shared `ScaleAdapter` interface.
- Keep raw BLE payload logging available in Debug.
- Decode BOOKOO Themis Ultra weight readings into grams.
- Implement live weight subscription for the Live Weight view.
- Implement simple stability detection.
- Add hardware tare only after confirming the command against the real scale.
- Add app-level zeroing as a fallback.
- Keep BLE protocol constants near the adapter.
- Keep UI components free of BLE decoding logic.
- Do not implement meal capture logic in this phase except for shared reading
  state needed by the next phase.

## Instructions

1. Confirm Phase 2 is complete in `docs/demo-phase-plan/progress.md`.
2. Review raw payload samples collected during Phase 2.
3. Implement or finalize shared types:
   - `ScaleConnectionState`
   - `ScaleDevice`
   - `ScaleReading`
   - `ScaleAdapter`
4. Implement `BookooScaleAdapter` responsibilities:
   - `scan()`
   - `connect(deviceId)`
   - `disconnect()`
   - `tare()`
   - `onWeightChange(callback)`
   - `getConnectionState()`
5. Add BOOKOO constants:
   - Service UUID: `0x0FFE`
   - Weight characteristic: `0xFF11`
   - Command characteristic: `0xFF12`
6. Decode notification payloads into `ScaleReading`:

   ```ts
   type ScaleReading = {
     grams: number;
     stable: boolean;
     rawPayload?: string;
     receivedAt: string;
   };
   ```

7. Validate decoding with known weights:
   - Empty scale
   - One small known object
   - Multiple known objects
   - Object removed back to zero
8. Implement stabilization:
   - Keep latest 10 readings.
   - Mark stable when the last 5 readings are within 2 grams.
   - Expose `stable`, `unstable`, or `unknown` in UI state.
9. Implement app-level zeroing:
   - Store an offset from the current reading.
   - Display adjusted grams while preserving raw grams in Debug logs if useful.
10. Implement hardware tare only if real-scale testing confirms the command.
11. Update Live Weight view:
    - Large live weight display.
    - Stability state.
    - Last updated timestamp.
    - Tare button.
    - App-level zero button.
    - Disconnect button.
    - Latest 5 decoded readings.
12. Update `docs/demo-phase-plan/progress.md` with decoding assumptions,
    verified payload examples, and tare status.

## Verifications

- `BookooScaleAdapter` is the only module that knows BOOKOO BLE UUIDs and
  payload decoding.
- Live Weight shows `--.- g` before any reading exists.
- Live Weight updates when weight changes on the physical scale.
- Displayed weight matches known test objects closely enough for MVP validation.
- Stability state changes from `unknown` to `stable` or `unstable`.
- App-level zeroing works even if hardware tare is unavailable.
- Hardware tare is either confirmed working or explicitly marked unsupported for
  now.
- Live Weight includes a `Disconnect` button that disconnects from the scale or
  shows a clear error.
- Debug still shows raw payloads and decoded readings.
- UI remains within `docs/ui/react-native-demo-ui-requirements.md`.
- `docs/demo-phase-plan/progress.md` records Phase 3 verification notes.

## Completion Criteria

Phase 3 is complete when the app can reliably display decoded live grams from
BOOKOO Themis Ultra on iPhone through `BookooScaleAdapter`, with raw payloads
still available for debugging.
