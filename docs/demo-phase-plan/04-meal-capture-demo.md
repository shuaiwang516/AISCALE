# Phase 4: Meal Capture Demo

## Goal

Build the first usable meal-scale workflow: record starting weight, record
remaining weight, and calculate consumed weight using live scale readings or
manual fallback input.

## Requirements

- Implement the Meal Capture view according to
  `docs/ui/react-native-demo-ui-requirements.md`.
- Use decoded readings from the generic scale manager/interface.
- Use `MockScaleAdapter` for simulator validation of the meal workflow.
- Support manual input fallback when BLE is unavailable.
- Warn when capturing unstable readings, but allow the user to continue.
- Calculate consumed weight as:

  ```text
  consumed_weight_g = max(starting_weight_g - remaining_weight_g, 0)
  ```

- Do not add photos, AI, calories, macros, nutrition guidance, history, auth, or
  backend persistence.
- Keep meal calculation logic outside UI components.
- Keep meal capture logic independent from any specific scale adapter.

## Instructions

1. Confirm Phase 3 is complete in `docs/demo-phase-plan/progress.md`.
2. Create meal state and calculation logic under `apps/mobile/src/meal`.
3. Model these meal capture states:
   - No start weight recorded
   - Start weight recorded, waiting for remaining weight
   - Both weights recorded
   - Manual input mode active
   - Invalid manual input
4. Implement required Meal Capture UI elements:
   - Current live weight
   - Start weight value
   - Remaining weight value
   - Consumed weight value
   - `Record start`
   - `Record remaining`
   - `Reset`
   - Manual start weight input
   - Manual remaining weight input
   - `Clear manual input`
   - Warning for unstable readings
5. Live reading behavior:
   - Use latest adjusted live grams from the generic scale state for capture.
   - Show warning when `stable` is false or unknown.
   - Allow user confirmation of unstable reading.
6. Manual input behavior:
   - Manual start and remaining values can complete the meal flow without BLE.
   - Invalid values must show visible inline errors.
   - Empty manual inputs should not overwrite existing live captures.
7. Reset behavior:
   - Clear start weight.
   - Clear remaining weight.
   - Clear consumed weight.
   - Clear manual inputs and validation errors.
   - Do not disconnect the scale.
8. Add focused automated tests if a test framework exists; otherwise add pure
   TypeScript tests when introducing the first test setup:
   - Consumed weight never negative.
   - Manual input parses valid numeric grams.
   - Invalid manual input is rejected.
   - Reset clears meal state.
9. Run iOS Simulator validation:
   - Complete meal capture with mock live readings.
   - Complete meal capture with manual start and remaining weights.
   - Confirm invalid manual input shows inline errors.
   - Confirm consumed weight never displays negative.
   - Confirm reset clears meal state without changing mock connection state.
10. Run physical iPhone validation with BOOKOO live readings after simulator
    validation passes.
11. Update `docs/demo-phase-plan/progress.md` with simulator validation,
    physical-device test evidence, and meal-flow notes.

## Verifications

- With BLE connected, the user can record start weight from live grams.
- With BLE connected, the user can record remaining weight from live grams.
- On iOS Simulator, mock readings can complete the start/remain/consumed flow.
- Meal Capture does not import `BookooScaleAdapter` or BOOKOO BLE constants.
- Consumed weight displays correctly.
- Consumed weight never displays as negative.
- Manual input can complete the same flow with Bluetooth disabled.
- Invalid manual input shows a visible error.
- Reset clears the meal flow without disconnecting the scale.
- Unstable readings show a warning but do not block capture.
- No AI, calories, macros, photos, history, account, or backend UI appears.
- `docs/demo-phase-plan/progress.md` records Phase 4 simulator and physical
  iPhone verification notes.

## Completion Criteria

Phase 4 is complete when the app can complete the full before-and-after meal
weight workflow on iPhone using either live BLE readings or manual fallback.
