# Demo App Implementation Progress

Use this file as the source of truth for implementation status across the demo
phases. Update it at the end of every phase and whenever a blocker is found.

## Current Status

- Overall status: Phase 1 complete
- Current phase: Phase 2 - BLE Proof of Concept (not started)
- Last updated: 2026-05-23
- Target hardware: BOOKOO Themis Ultra
- First validation platform: physical iPhone
- Later validation platform: physical Android phone

## Phase Tracker

| Phase | Plan | Status | Completion Evidence |
|---:|---|---|---|
| 1 | [Project Setup](./01-project-setup.md) | Complete | Expo TypeScript app scaffolded under `apps/mobile`; dependencies installed; TypeScript passes; dev-client iOS Simulator build launches; four-view shell and mock/manual source UI verified on iPhone 17 Pro simulator with iOS 26.0.1. |
| 2 | [BLE Proof of Concept](./02-ble-proof-of-concept.md) | Not started | Pending iPhone scan/connect, service discovery, and raw payload logging. |
| 3 | [Weight Adapter](./03-weight-adapter.md) | Not started | Pending decoded live grams, stability state, and tare/zero validation. |
| 4 | [Meal Capture Demo](./04-meal-capture-demo.md) | Not started | Pending start/remain capture, consumed weight calculation, and manual fallback. |
| 5 | [Android Bring-Up](./05-android-bring-up.md) | Not started | Pending Android permissions, scan/connect, live weight, and meal capture validation. |

## Verification Log

Add dated notes here as each phase is worked.

### 2026-05-22

- Created phase plan documents.
- No implementation started yet.

### 2026-05-23

- Added simulator validation requirements to the phase plans.
- iOS Simulator is used for build, UI, mock-state, manual fallback, and
  unavailable-BLE validation.
- Physical iPhone remains required for real BOOKOO BLE scan/connect,
  service/characteristic discovery, notifications, and weight decoding.
- Implemented Phase 1 app scaffold under `apps/mobile` using Expo SDK 56,
  React Native, and TypeScript.
- Installed baseline dependencies: `expo-dev-client`, `react-native-ble-plx`,
  React Navigation tabs, `react-native-screens`, `react-native-safe-area-context`,
  and `expo-clipboard`.
- Added iOS and Android Bluetooth configuration in `apps/mobile/app.json`.
  `npx expo config --type public` shows the BLE plugin and Android Bluetooth
  permissions, and the generated iOS `Info.plist` contains
  `NSBluetoothAlwaysUsageDescription`.
- Added generic scale boundary in `apps/mobile/src/bluetooth`: shared scale
  types, `ScaleManager`, `MockScaleAdapter`, and `ManualInputScaleAdapter`.
  Screens call the manager/interface rather than any BOOKOO-specific adapter or
  UUID constants.
- Added the strict four-view shell: Device, Live Weight, Meal Capture, and
  Debug. Every view renders the global status area with connection state,
  connected device placeholder, last live weight placeholder, and last error
  placeholder.
- Added required shared UI components: `StatusBanner`, `PrimaryActionButton`,
  `SecondaryActionButton`, `ReadingPanel`, `DeviceRow`, `DebugLog`, and
  `NumericInput`.
- Added a clearly labeled development-only mock scale path and manual fallback
  path. The Device view states that simulator validation uses mock/manual
  sources only and is not a real BOOKOO connection.
- Verified dependency installation succeeded during scaffold/dependency setup.
- Verified `npm run typecheck` passes from `apps/mobile`.
- Verified `npx expo install --check` reports dependencies are up to date.
- Attempted iOS Simulator validation with iPhone 16 Pro on iOS 18.3.1
  (`22D8075`) using `CI=1 npx expo run:ios --device "iPhone 16 Pro"`.
  Expo prebuild created the iOS native project and `pod install` completed, but
  `xcodebuild` exited with error code 70 before app launch. Active Xcode is
  26.0.1 (`17A400`); `xcodebuild -showdestinations` lists no eligible iOS
  Simulator destination and reports that the iOS 26.0 platform/runtime is not
  installed. Navigation and on-simulator UI interaction remain unverified until
  the local simulator runtime is fixed.
- Fixed the local simulator blocker by installing the matching iOS simulator
  runtime with `xcodebuild -downloadPlatform iOS`. The available simulator
  runtime is now iOS 26.0.1 (`23A8464`), and Xcode lists iOS Simulator
  destinations for the `SmartScaleDemo` scheme.
- Added `patch-package` and `apps/mobile/patches/expo-modules-jsi+56.0.7.patch`
  so `expo-modules-jsi` compiles under the installed Xcode 26.0.1 Swift 6.2
  toolchain. The patch changes `weak let` runtime references to Swift-valid
  weak mutable references, with `nonisolated(unsafe)` only where strict
  `Sendable` checking requires it.
- Verified `pod install` succeeds from `apps/mobile/ios` after the dependency
  patch.
- Verified `CI=1 npx expo run:ios --device "iPhone 17 Pro"` succeeds from
  `apps/mobile`, installs the development build, starts Metro, and opens the
  app in the iPhone 17 Pro simulator running iOS 26.0.1.
- Captured simulator screenshots under `/tmp/smart-scale-phase1/`:
  `device-clean.png`, `device-scanned.png`, `live-weight-tab.png`,
  `meal-capture-tab.png`, and `debug-tab.png`.
- Confirmed the app opens without Expo Go. The visible app shell has exactly
  four primary tabs: Device, Live Weight, Meal Capture, and Debug.
- Confirmed navigation across the four primary views in the simulator by
  driving the visible tab bar and capturing screenshots of each tab.
- Confirmed every primary view shows the required global status area with
  connection state, connected device placeholder, last live weight placeholder,
  and last error placeholder.
- Confirmed Device scan in the simulator shows clearly labeled `Mock/dev` and
  `Manual fallback` sources, with copy stating simulator validation is not a
  real BOOKOO connection.
- Confirmed static checks: `npx expo install --check` reports dependencies are
  up to date; search found no screen imports of `BookooScaleAdapter` or BOOKOO
  UUID constants; search found no AI, nutrition, account, subscription,
  marketing, calorie, or macro UI copy in the app source.

## Known Blockers

- BOOKOO Themis Ultra has been purchased but real-device BLE testing cannot
  begin until the device is available.

## Rules for Updating This File

- Update `Current Status` before and after working on a phase.
- Change a phase to `In progress` when implementation starts.
- Change a phase to `Complete` only after its verification section passes.
- Record physical device model, OS version, and key test evidence for BLE
  phases.
- Record blockers with enough detail that another engineer can resume without
  rediscovering the same issue.
