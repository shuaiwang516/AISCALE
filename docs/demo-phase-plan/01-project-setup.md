# Phase 1: Project Setup

## Goal

Create the React Native mobile app scaffold for the BOOKOO Themis Ultra demo.
This phase prepares the codebase for BLE work without attempting real Bluetooth
integration yet.

## Requirements

- Create the app under `apps/mobile`.
- Use React Native with TypeScript.
- Use an Expo development build workflow, not Expo Go.
- Prepare for `react-native-ble-plx`.
- Add basic iOS and Android Bluetooth configuration.
- Create a generic scale abstraction so screens and meal logic are not coupled
  to BOOKOO-specific BLE details.
- Support iOS Simulator validation for app shell, navigation, and non-BLE UI
  behavior.
- Create the strict four-view demo shell required by
  `docs/ui/react-native-demo-ui-requirements.md`:
  - Device
  - Live Weight
  - Meal Capture
  - Debug
- Add the required global status area to every primary view:
  - Connection state
  - Connected device name when available
  - Last live weight when available
  - Last error message when available
- Do not add onboarding, auth, backend, AI, nutrition, history, or marketing UI.
- Add placeholder state only; do not fake a completed BLE integration.
- Add a clearly labeled development-only mock scale path for simulator
  validation; it must not be presented as a real BOOKOO connection.

## Instructions

1. Read these docs before editing app UI or architecture:
   - `CONTEXT.md`
   - `AGENTS.md`
   - `docs/react-native-demo-app-plan.md`
   - `docs/ui/react-native-demo-ui-requirements.md`
2. Scaffold `apps/mobile` as an Expo React Native TypeScript app.
3. Configure the app for development builds:
   - Ensure the project can run with native modules.
   - Do not rely on Expo Go for BLE testing.
4. Install the baseline dependencies:
   - React Native / Expo dependencies from the scaffold.
   - `react-native-ble-plx`.
   - Any minimal navigation package needed for the four primary views.
5. Add platform configuration:
   - iOS Bluetooth usage descriptions.
   - Android Bluetooth permissions for later bring-up.
6. Create the initial source structure:

   ```text
   apps/mobile/src/components/
   apps/mobile/src/screens/
   apps/mobile/src/bluetooth/
   apps/mobile/src/meal/
   apps/mobile/src/hooks/
   ```

7. Create minimal shared UI components required by the UI spec:
   - `StatusBanner`
   - `PrimaryActionButton`
   - `SecondaryActionButton`
   - `ReadingPanel`
   - `DeviceRow`
   - `DebugLog`
   - `NumericInput`
8. Create placeholder screens for the four required views.
9. Render `StatusBanner` or an equivalent global status area on every primary
   view with placeholder values for:
   - Connection state
   - Connected device name
   - Last live weight
   - Last error message
10. Create initial TypeScript types for scale state:
   - `ScaleAdapterId`
   - `ScaleConnectionState`
   - `ScaleDevice`
   - `ScaleReading`
   - `ScaleCapabilities`
   - `ScaleAdapter`
11. Create a `ScaleManager` or equivalent adapter registry:
    - It owns the active adapter.
    - It exposes generic scan/connect/disconnect/tare/readings APIs.
    - It is the only layer screens call for scale operations.
    - It keeps adapter-specific device matching out of screens.
12. Add a `MockScaleAdapter` for simulator validation and UI development:
    - It must be clearly labeled as mock/dev state.
    - It must not claim to be connected to a real BOOKOO scale.
    - It should provide enough placeholder readings for later UI validation.
13. Add a `ManualInputScaleAdapter` or equivalent manual-source path for
    fallback behavior.
14. Run initial iOS Simulator validation:
    - Start the app with the iOS Simulator target.
    - Confirm the app opens without Expo Go.
    - Confirm navigation works across all four primary views.
    - Confirm placeholder/mock status renders without BLE hardware.
15. Update `docs/demo-phase-plan/progress.md` when this phase is complete.

## Verifications

- From `apps/mobile`, dependency installation succeeds.
- TypeScript compiles.
- The app starts in an iOS Simulator.
- The app shows exactly the four required primary views.
- Every primary view shows connection state, connected device name placeholder,
  last live weight placeholder, and last error placeholder.
- Screens use the generic scale manager/interface rather than importing
  `BookooScaleAdapter` or BOOKOO UUID constants.
- The mock/dev scale path is visibly labeled and cannot be mistaken for a real
  BOOKOO connection.
- iOS Simulator validation is recorded in `progress.md` with simulator model and
  iOS runtime version.
- The UI follows `docs/ui/react-native-demo-ui-requirements.md`.
- No screen contains AI, nutrition, account, subscription, or marketing content.
- Bluetooth permissions/configuration are present for iOS and Android.
- `docs/demo-phase-plan/progress.md` marks Phase 1 complete with notes.

## Completion Criteria

Phase 1 is complete when the app shell runs and future phases can implement BLE
logic inside the prepared structure without reorganizing the project.
