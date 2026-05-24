# Phase 3: Weight Adapter

## Goal

Convert the BLE proof of concept into a reusable adapter architecture. The first
real adapter is `BookooScaleAdapter`, but the app must be able to swap in a
future custom BLE scale by adding a new adapter instead of rewriting screens or
meal logic.

## Requirements

- Implement `BookooScaleAdapter` behind the shared `ScaleAdapter` interface.
- Implement or finalize the generic scale manager/registry used by screens.
- Keep raw BLE payload logging available in Debug.
- Decode BOOKOO Themis Ultra weight readings into grams.
- Implement live weight subscription for the Live Weight view.
- Implement simple stability detection.
- Add hardware tare only after confirming the command against the real scale.
- Add app-level zeroing as a fallback.
- Support simulator validation through `MockScaleAdapter` for Live Weight UI,
  stability display, zeroing behavior, and disconnect behavior.
- Keep BLE protocol constants near the adapter.
- Keep all BOOKOO UUIDs, payload parsing, and tare command bytes inside
  `BookooScaleAdapter` or adapter-local helpers.
- Keep UI components free of BLE decoding logic.
- Keep screens free of direct adapter construction; screens call the generic
  manager/interface only.
- Do not implement meal capture logic in this phase except for shared reading
  state needed by the next phase.

## Instructions

1. Confirm Phase 2 is complete in `docs/demo-phase-plan/progress.md`.
2. Review raw payload samples collected during Phase 2.
3. Implement or finalize shared types:
   - `ScaleAdapterId`
   - `ScaleConnectionState`
   - `ScaleDevice`
   - `ScaleReading`
   - `ScaleCapabilities`
   - `ScaleAdapter`
4. Implement or finalize `ScaleManager` responsibilities:
   - Register available adapters.
   - Route scan/connect/disconnect/tare to the active adapter.
   - Expose active adapter ID, label, capabilities, connection state, current
     reading, and recent readings.
   - Keep the public screen-facing API independent from BOOKOO.
5. Implement `BookooScaleAdapter` responsibilities:
   - `scan()`
   - `connect(deviceId)`
   - `disconnect()`
   - `tare()`
   - `onWeightChange(callback)`
   - `getConnectionState()`
6. Add BOOKOO constants inside the BOOKOO adapter module only:
   - Service UUID: `0x0FFE`
   - Weight characteristic: `0xFF11`
   - Command characteristic: `0xFF12`
7. Decode notification payloads into `ScaleReading`:

   ```ts
   type ScaleReading = {
     grams: number;
     stable: boolean;
     source: ScaleAdapterId;
     rawPayload?: string;
     receivedAt: string;
   };
   ```

8. Validate decoding with known weights:
   - Empty scale
   - One small known object
   - Multiple known objects
   - Object removed back to zero
9. Implement stabilization:
   - Keep latest 10 readings.
   - Mark stable when the last 5 readings are within 2 grams.
   - Expose `stable`, `unstable`, or `unknown` in UI state.
10. Implement app-level zeroing:
   - Store an offset from the current reading.
   - Display adjusted grams while preserving raw grams in Debug logs if useful.
11. Implement hardware tare only if real-scale testing confirms the command.
12. Update Live Weight view:
    - Large live weight display.
    - Stability state.
    - Last updated timestamp.
    - Tare button.
    - App-level zero button.
    - Disconnect button.
    - Latest 5 decoded readings.
    - Active adapter/source label.
13. Run iOS Simulator validation using `MockScaleAdapter`:
    - Confirm Live Weight renders `--.- g` before mock readings start.
    - Confirm changing mock readings update the large weight value.
    - Confirm stability state changes from `unknown` to `stable` or `unstable`.
    - Confirm app-level zeroing adjusts displayed grams.
    - Confirm `Disconnect` changes mock connection state or shows a clear error.
    - Confirm Debug labels mock readings separately from real raw BLE payloads.
14. Run physical iPhone validation with BOOKOO Themis Ultra for real decoding.
15. Update `docs/demo-phase-plan/progress.md` with simulator validation,
    decoding assumptions, verified payload examples, and tare status.

## Verifications

- `BookooScaleAdapter` is the only module that knows BOOKOO BLE UUIDs and
  payload decoding.
- Screens call only the generic scale manager/interface for scan, connect,
  disconnect, tare, and readings.
- A future adapter can be added by implementing `ScaleAdapter` and registering
  it without changing Meal Capture logic.
- On iOS Simulator, `MockScaleAdapter` can drive Live Weight UI, stability,
  app-level zeroing, and disconnect behavior without pretending to be real BLE.
- Live Weight shows `--.- g` before any reading exists.
- Live Weight updates when weight changes on the physical scale.
- Displayed weight matches known test objects closely enough for MVP validation.
- Stability state changes from `unknown` to `stable` or `unstable`.
- App-level zeroing works even if hardware tare is unavailable.
- Hardware tare is either confirmed working or explicitly marked unsupported for
  now.
- Live Weight includes a `Disconnect` button that disconnects from the scale or
  shows a clear error.
- Live Weight and Debug show active adapter/source label.
- Debug still shows raw payloads and decoded readings.
- UI remains within `docs/ui/react-native-demo-ui-requirements.md`.
- `docs/demo-phase-plan/progress.md` records Phase 3 simulator and physical
  iPhone verification notes.

## Completion Criteria

Phase 3 is complete when the app can reliably display decoded live grams from
BOOKOO Themis Ultra on iPhone through `BookooScaleAdapter`, with raw payloads
still available for debugging.
