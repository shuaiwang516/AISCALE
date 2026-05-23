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
   - `ScaleConnectionState`
   - `ScaleDevice`
   - `ScaleReading`
   - `ScaleAdapter`
11. Add a `MockScaleAdapter` only if needed to make the shell testable without
    the physical scale.
12. Update `docs/demo-phase-plan/progress.md` when this phase is complete.

## Verifications

- From `apps/mobile`, dependency installation succeeds.
- TypeScript compiles.
- The app starts in an iOS simulator or on a physical iPhone.
- The app shows exactly the four required primary views.
- Every primary view shows connection state, connected device name placeholder,
  last live weight placeholder, and last error placeholder.
- The UI follows `docs/ui/react-native-demo-ui-requirements.md`.
- No screen contains AI, nutrition, account, subscription, or marketing content.
- Bluetooth permissions/configuration are present for iOS and Android.
- `docs/demo-phase-plan/progress.md` marks Phase 1 complete with notes.

## Completion Criteria

Phase 1 is complete when the app shell runs and future phases can implement BLE
logic inside the prepared structure without reorganizing the project.
