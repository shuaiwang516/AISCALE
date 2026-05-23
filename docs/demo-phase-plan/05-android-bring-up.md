# Phase 5: Android Bring-Up

## Goal

Validate that the same React Native demo app can run the scan, connect, live
weight, debug, and meal capture flows on a physical Android device.

Android comes after iOS because the BOOKOO protocol and decoding should already
be proven.

## Requirements

- Use the same app architecture and `BookooScaleAdapter`.
- Keep protocol decoding shared across platforms.
- Configure Android Bluetooth permissions correctly.
- Validate on a physical Android phone.
- Preserve the same strict UI and four-view navigation.
- Do not add Android-specific product features.
- Do not change iOS behavior while fixing Android issues.

## Instructions

1. Confirm Phase 4 is complete in `docs/demo-phase-plan/progress.md`.
2. Review Android Bluetooth permission requirements for the target SDK.
3. Configure Android permissions for BLE scanning and connection:
   - Bluetooth scan permission.
   - Bluetooth connect permission.
   - Location permission only if needed by the Android target/version.
4. Add runtime permission handling in the Device view or BLE layer:
   - Show missing permission state.
   - Request permissions before scanning.
   - Show actionable error if permission is denied.
5. Build and install the app on a physical Android phone.
6. Run the same flow already validated on iPhone:
   - Scan.
   - Connect.
   - Discover services/characteristics.
   - Subscribe to weight notifications.
   - Display decoded live grams.
   - Record start and remaining weights.
   - Calculate consumed weight.
7. Fix only Android-specific issues needed to make the same flow work.
8. Confirm iOS still builds after Android changes.
9. Update `docs/demo-phase-plan/progress.md` with Android device model, OS
   version, permission behavior, and known limitations.

## Verifications

- Android app installs on a physical device.
- Permission prompt appears when needed.
- Permission denial shows a visible, actionable error.
- Scan lists nearby BLE devices.
- BOOKOO Themis Ultra appears while powered on.
- Connect succeeds or failure is shown clearly.
- Debug view lists services and characteristics.
- Live Weight displays decoded grams.
- Meal Capture works with live readings.
- Manual fallback still works.
- iOS build still succeeds after Android changes.
- UI still follows `docs/ui/react-native-demo-ui-requirements.md`.
- `docs/demo-phase-plan/progress.md` records Phase 5 verification notes.

## Completion Criteria

Phase 5 is complete when Android can complete the same demo workflow as iPhone
or when any Android blocker is documented with enough detail to resume later.
