# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains planning docs for a discreet AI meal scale. `CONTEXT.md` is the source for product context, MVP scope, and safety constraints. `docs/react-native-demo-app-plan.md` describes the planned React Native BLE demo, `docs/demo-phase-plan/` contains the phase-by-phase implementation plans, and `docs/demo-phase-plan/progress.md` tracks implementation status.

When implementation begins, follow the planned structure:

```text
apps/mobile/              React Native + TypeScript app
apps/mobile/src/bluetooth BLE adapters and scale protocol code
apps/mobile/src/meal      meal capture and consumed-weight logic
packages/scale-adapters   shared scale integrations after they stabilize
packages/shared-types     cross-app TypeScript types
docs/                     product and engineering plans
```

Keep repository-level documentation in the root or `docs/`, and app code under `apps/mobile` once scaffolded.

## Build, Test, and Development Commands

There is no runnable app or `package.json` yet. Until scaffolded, use documentation checks:

- `git status --short`: inspect pending changes.
- `rg "term" .`: search docs and source quickly.

After `apps/mobile` exists, run expected commands from that directory:

- `npm install`: install app dependencies.
- `npx expo run:ios`: build and launch the iOS development app, usually on an iOS Simulator.
- `npx expo run:ios --device`: build and launch on a physical iPhone for real BOOKOO BLE validation.
- `npx expo run:android`: validate Android emulator/device behavior after iOS BLE decoding works.
- `npm test`: run the project test suite once configured.

## Coding Style & Naming Conventions

Use TypeScript for app and package code. Prefer explicit modules, such as `BookooScaleAdapter`, `MockScaleAdapter`, and `ManualInputScaleAdapter`. Use `PascalCase` for React components and classes, `camelCase` for functions and variables, and `kebab-case` for documentation filenames. Keep BLE constants near the adapter that uses them. Preserve raw payload logging in debug paths.

## Scale Adapter Boundary

BOOKOO Themis Ultra is the first MVP device, not a permanent app dependency. Agents MUST keep screens, UI components, and meal logic dependent on a generic scale manager/interface, not directly on `BookooScaleAdapter` or BOOKOO UUID constants. Device-specific BLE UUIDs, payload parsing, tare commands, and matching rules belong inside the relevant adapter module. A future custom BLE scale should be addable by implementing and registering a new `ScaleAdapter`, without rewriting Device, Live Weight, Meal Capture, or Debug screens.

## Mandatory UI Requirements

Before creating or changing any mobile app UI, agents MUST read and follow `docs/ui/react-native-demo-ui-requirements.md`. Those UI requirements are mandatory for the first demo app: keep the UI strict, functional, and BLE-workflow focused. Do not add screens, visual polish, marketing content, AI/nutrition mockups, or consumer-product flows that the UI requirements mark as out of scope.

## Demo Phase Workflow

When implementing the demo app, agents MUST work one phase at a time from `docs/demo-phase-plan/`. Before starting a phase, read that phase plan and `docs/demo-phase-plan/progress.md`. At the end of each phase, update `progress.md` with status, verification evidence, and blockers. Do not begin the next phase until the current phase's verification section has passed or the blocker is documented.

## Simulator vs Device Validation

iOS Simulator validation is required where the phase plans call for it, but it is limited to build, navigation, strict UI, mock scale behavior, manual fallback, and unavailable-BLE/error states. Agents MUST NOT mark real BLE scan, connect, service discovery, notifications, payload decoding, or tare validation complete from simulator results. Real BOOKOO BLE validation requires a physical iPhone and the BOOKOO Themis Ultra. Android emulator validation is similarly limited to build/UI/permission-state checks; real Android BLE validation requires a physical Android device.

## Testing Guidelines

Follow the verification section of the active phase plan in `docs/demo-phase-plan/`. Prioritize real-device BLE validation whenever a phase requires BLE behavior. The first real BLE target is a physical iPhone with the BOOKOO Themis Ultra. Use simulator validation only for the non-BLE checks allowed by the phase plan. When automated tests are introduced, place them near the code under test and cover generic scale manager behavior, adapter state transitions, stabilization, app-level zeroing, manual fallback, and consumed-weight calculation.

## Commit & Pull Request Guidelines

The current history only shows `first commit`, so use short, imperative commit messages going forward, for example `Add mobile app scaffold` or `Document BLE test plan`. Pull requests should include a concise summary, changed areas, test evidence, and screenshots or recordings for UI changes. Link related issues when available and call out hardware, platform, or BLE assumptions explicitly.

## Security & Configuration Tips

Do not commit device-specific secrets, API keys, provisioning files, or private BLE captures. Avoid medical claims in app copy and AI output; describe nutrition estimates as uncertain and user-editable.
