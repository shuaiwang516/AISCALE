# Demo App Implementation Progress

Use this file as the source of truth for implementation status across the demo
phases. Update it at the end of every phase and whenever a blocker is found.

## Current Status

- Overall status: Not started
- Current phase: Phase 1 - Project Setup
- Last updated: 2026-05-23
- Target hardware: BOOKOO Themis Ultra
- First validation platform: physical iPhone
- Later validation platform: physical Android phone

## Phase Tracker

| Phase | Plan | Status | Completion Evidence |
|---:|---|---|---|
| 1 | [Project Setup](./01-project-setup.md) | Not started | Pending app scaffold, TypeScript build, and four-view shell verification. |
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
