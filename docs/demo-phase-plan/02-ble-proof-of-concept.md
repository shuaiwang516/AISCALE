# Phase 2: BLE Proof of Concept

## Goal

Prove that the mobile app can discover and connect to the BOOKOO Themis Ultra
and observe raw BLE services, characteristics, and notifications on a physical
iPhone.

This phase is about visibility and protocol discovery. It should not hide raw
payloads behind final abstractions too early.

## Requirements

- Use a physical iPhone as the first validation device.
- Use `react-native-ble-plx` for BLE scanning, connection, discovery, and
  notification monitoring.
- Implement the Device view scan/connect flow.
- Show Bluetooth permission status on the Device view.
- Show a Disconnect button on the Device view when connected.
- Implement enough Debug view behavior to inspect raw BLE data, clear logs, copy
  logs when available, and view tare command payload/result state.
- Show all discovered nearby devices during early debugging.
- Mark likely BOOKOO devices instead of hiding non-BOOKOO devices.
- Discover services and characteristics after connection.
- Subscribe to the BOOKOO weight data characteristic when available.
- Preserve raw notification payloads in the Debug view.
- Do not attempt Android bring-up in this phase.
- Do not implement meal capture beyond placeholders.

## Instructions

1. Confirm Phase 1 is complete in `docs/demo-phase-plan/progress.md`.
2. Keep UI changes within the strict UI requirements.
3. Implement BLE manager lifecycle:
   - Initialize the BLE manager.
   - Clean up BLE manager resources when the app unmounts or disconnects.
   - Handle Bluetooth powered-off, unauthorized, and unavailable states.
   - Surface Bluetooth permission/status in the Device view.
4. Implement scanning:
   - Start scan from an explicit `Scan` button.
   - Stop scan from an explicit `Stop` button.
   - Store discovered devices by device ID to avoid duplicate rows.
   - Display name, ID, RSSI when available, and likely-BOOKOO marker.
5. Implement connection:
   - Connect only after the user taps `Connect`.
   - Update connection state through `idle`, `scanning`, `connecting`,
     `connected`, `disconnected`, and `error`.
   - Show clear errors on failed connection.
   - Show an explicit `Disconnect` button when connected.
   - Disconnect only after the user taps `Disconnect` or when the peripheral
     connection is lost.
6. Implement discovery after connection:
   - Discover all services and characteristics.
   - Display discovered services and characteristics in Debug.
   - Look for BOOKOO starting UUIDs:
     - Service UUID: `0x0FFE`
     - Weight characteristic: `0xFF11`
     - Command characteristic: `0xFF12`
7. Implement raw notification logging:
   - Subscribe to the weight data characteristic when found.
   - Log raw notification payloads exactly as received.
   - Include timestamp and characteristic UUID for each log entry.
8. Implement Debug log controls and command-result fields:
   - `Clear logs` empties the visible debug log.
   - `Copy logs` is present when the platform supports copying.
   - Tare command payload and result are visible, even if marked `not tested` or
     `not sent` during this phase.
9. Test with simple known weights only for observation.
10. Update `docs/demo-phase-plan/progress.md` with device, OS version, app
   version/commit, observed service UUIDs, and sample payload notes.

## Verifications

- On physical iPhone, tapping `Scan` lists nearby BLE devices.
- Device view shows Bluetooth permission/status.
- BOOKOO Themis Ultra appears in the Device view when powered on.
- Non-BOOKOO devices remain visible during scanning.
- Tapping `Connect` connects to the scale or shows a clear error.
- Device view shows a `Disconnect` button when connected.
- Tapping `Disconnect` disconnects from the scale or shows a clear error.
- Debug view displays connected device name and ID.
- Debug view displays discovered services and characteristics.
- If the weight characteristic is found, Debug view records raw notifications.
- Debug view includes `Clear logs`.
- Debug view includes `Copy logs` when available on the platform.
- Debug view shows tare command payload and result state.
- Turning the scale off or moving out of range updates state to disconnected or
  error.
- No meal, AI, nutrition, account, or backend feature is introduced.
- `docs/demo-phase-plan/progress.md` records Phase 2 verification notes.

## Completion Criteria

Phase 2 is complete when a physical iPhone can discover the BOOKOO Themis Ultra,
connect to it, list services/characteristics, and capture raw notification
payloads for later decoding.
