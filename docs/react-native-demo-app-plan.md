# React Native Demo App Building Plan

## 1. Purpose

Build the first mobile demo for the discreet AI meal scale project using the
BOOKOO Themis Ultra as the target Bluetooth scale.

The first demo is not a full nutrition product. Its job is to prove that a
custom app can connect to the scale, read live weight over Bluetooth Low Energy
(BLE), capture before-and-after meal weights, and calculate consumed weight.

Primary validation question:

```text
Can a user discreetly record a real meal using live scale weight in less than
60 seconds?
```

## 2. Recommended Direction

Use a cross-platform React Native codebase, but validate the first BLE flow on a
physical iPhone.

Decision:

- Framework: React Native with TypeScript
- App setup: Expo development build, not Expo Go
- BLE library: `react-native-ble-plx`
- First test platform: physical iPhone
- Second platform: Android after iOS weight decoding works
- First hardware: BOOKOO Themis Ultra

Reasoning:

- React Native keeps iOS and Android in one codebase.
- iOS-first testing reduces initial BLE permission and device-fragmentation
  overhead.
- Expo Go is not suitable because BLE requires native modules.
- Android support should be added after the BOOKOO protocol and weight payloads
  are confirmed on iOS.

## 3. MVP Scope

### In Scope

- Scan nearby BLE devices.
- Filter or identify BOOKOO Themis Ultra.
- Connect to the selected scale.
- Discover BLE services and characteristics.
- Subscribe to live weight notifications.
- Decode weight in grams.
- Display live weight.
- Send tare command if the protocol command works reliably.
- Record starting meal weight.
- Record remaining meal weight.
- Calculate consumed weight.
- Show basic connection state and error state.
- Provide manual weight input fallback.
- Provide a debug view for raw BLE payloads.

### Out of Scope

- User accounts
- Backend persistence
- AI food recognition
- Nutrition database integration
- Meal history
- Subscription logic
- Apple Health or Google Health Connect integration
- Polished public-launch UI
- Custom hardware work

## 4. Proposed Repository Structure

When the app implementation begins, use this structure:

```text
/
├── apps/
│   └── mobile/
│       ├── app/
│       ├── src/
│       │   ├── components/
│       │   ├── screens/
│       │   ├── hooks/
│       │   ├── bluetooth/
│       │   └── meal/
│       └── package.json
├── packages/
│   ├── scale-adapters/
│   └── shared-types/
└── docs/
    └── react-native-demo-app-plan.md
```

For the first prototype, it is acceptable to keep the scale adapter inside
`apps/mobile/src/bluetooth`. Move it into `packages/scale-adapters` once the
interface stabilizes or Android support starts.

## 5. Scale Adapter Design

Define a common adapter interface so the app is not tightly coupled to one
scale implementation.

```ts
export type ScaleConnectionState =
  | "idle"
  | "scanning"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export type ScaleReading = {
  grams: number;
  stable: boolean;
  rawPayload?: string;
  receivedAt: string;
};

export interface ScaleAdapter {
  scan(): Promise<ScaleDevice[]>;
  connect(deviceId: string): Promise<void>;
  disconnect(): Promise<void>;
  tare(): Promise<void>;
  onWeightChange(callback: (reading: ScaleReading) => void): () => void;
  getConnectionState(): ScaleConnectionState;
}
```

Initial adapters:

- `BookooScaleAdapter`: real BLE integration for BOOKOO Themis Ultra.
- `MockScaleAdapter`: simulated readings for UI development.
- `ManualInputScaleAdapter`: fallback path for demos when BLE fails.

## 6. BOOKOO Themis Ultra BLE Notes

Use the official BOOKOO open protocol as the source of truth during
implementation.

Known starting points:

- Service UUID: `0x0FFE`
- Weight data characteristic: `0xFF11`
- Command characteristic: `0xFF12`

Implementation behavior:

- Scan for devices with BOOKOO-related name or advertised service.
- Connect to the selected peripheral.
- Discover services and characteristics.
- Subscribe to the weight data characteristic.
- Log raw notification payloads in debug mode.
- Decode grams only after payload samples are confirmed against known weights.
- Send tare through the command characteristic if confirmed with the real scale.
- Keep manual tare in the app as a fallback if hardware tare is unreliable.

## 7. Demo Screens

### Device Screen

Purpose: find and connect to the BOOKOO scale.

Required UI:

- Bluetooth permission status
- Scan button
- List of discovered devices
- Connect button per device
- Current connection state
- Last connection error, if any

### Live Weight Screen

Purpose: prove the app can receive and display real-time weight.

Required UI:

- Current live weight in grams
- Stability indicator
- Tare button
- Disconnect button
- Last updated timestamp

### Meal Capture Screen

Purpose: validate the before-and-after meal workflow.

Required UI:

- Record starting weight
- Record remaining weight
- Display consumed weight
- Reset meal button
- Manual weight fallback entry

Calculation:

```text
consumed_weight_g = max(starting_weight_g - remaining_weight_g, 0)
```

### Debug BLE Screen

Purpose: make protocol development faster.

Required UI:

- Connected device ID and name
- Discovered services
- Discovered characteristics
- Raw notification payload log
- Decoded weight log
- Tare command result

## 8. Weight Stabilization

Do not rely on a single raw reading for meal capture.

Initial stabilization rule:

- Keep the latest 10 readings.
- A reading is stable when the last 5 readings are within 2 grams of each other.
- The app should still allow manual capture if the user confirms an unstable
  reading.

This rule is intentionally simple. It can be refined after testing real meals.

## 9. Implementation Phases

### Phase 1: Project Setup

- Create `apps/mobile`.
- Set up React Native with TypeScript.
- Configure Expo development build.
- Install and configure `react-native-ble-plx`.
- Add iOS Bluetooth permission strings.
- Add Android Bluetooth permissions, even if Android is tested later.

### Phase 2: BLE Proof of Concept

- Build scan/connect flow.
- Connect to BOOKOO Themis Ultra.
- Discover services and characteristics.
- Subscribe to the weight characteristic.
- Display raw payloads.
- Confirm payload values using known weights.

### Phase 3: Weight Adapter

- Implement `BookooScaleAdapter`.
- Decode weight in grams.
- Add live weight subscription.
- Add tare command if confirmed.
- Add disconnect and reconnect handling.

### Phase 4: Meal Capture Demo

- Add live weight screen.
- Add starting weight capture.
- Add remaining weight capture.
- Calculate consumed weight.
- Add manual weight fallback.

### Phase 5: Android Bring-Up

- Validate Android BLE permissions.
- Repeat scan/connect/live weight flow.
- Fix platform-specific connection issues.
- Keep protocol decoding shared across platforms.

## 10. Acceptance Criteria

The first demo is successful when:

- A physical iPhone can discover the BOOKOO Themis Ultra.
- The app can connect to the scale.
- The app receives live weight updates.
- The displayed weight changes correctly when objects are added or removed.
- The app can record starting and remaining meal weights.
- The app calculates consumed weight.
- Manual input fallback can complete the same meal flow without BLE.
- Debug mode shows raw BLE payloads for troubleshooting.

Stretch criteria:

- Hardware tare works from the app.
- Android can complete the same flow.
- The app reconnects automatically after a short disconnect.

## 11. Manual Test Plan

### iPhone BLE Test

1. Turn on BOOKOO Themis Ultra.
2. Open the app on a physical iPhone.
3. Scan for nearby devices.
4. Confirm the scale appears.
5. Connect to the scale.
6. Confirm live weight is displayed.
7. Place a known object on the scale.
8. Confirm the displayed weight updates.
9. Remove the object.
10. Confirm the displayed weight returns near zero.

### Meal Capture Test

1. Place an empty plate or container on the scale.
2. Tare or record the base weight.
3. Add food or a test object.
4. Record starting weight.
5. Remove part of the food or object.
6. Record remaining weight.
7. Confirm consumed weight is calculated correctly.

### Manual Fallback Test

1. Disconnect Bluetooth or turn off the scale.
2. Open manual input.
3. Enter starting weight.
4. Enter remaining weight.
5. Confirm consumed weight is calculated correctly.

### Android Test

Run after iOS validation:

1. Install app on a physical Android phone.
2. Grant Bluetooth permissions.
3. Scan for the BOOKOO scale.
4. Connect and verify live weight updates.
5. Repeat meal capture test.

## 12. Risks and Mitigations

- BLE payload decoding may differ from documentation.
  - Mitigation: preserve raw payload logging and test with known weights.
- Hardware tare may be unreliable or unsupported in practice.
  - Mitigation: support app-level tare and manual fallback.
- Android BLE permissions may slow down first validation.
  - Mitigation: validate iOS first, then bring Android up after decoding works.
- Coffee scale form factor may be imperfect for plates.
  - Mitigation: test with takeout containers, bowls, and smaller plates first.
- Live weight may fluctuate in real meals.
  - Mitigation: use simple stability detection and allow user confirmation.

## 13. Defaults and Assumptions

- First implementation should optimize for technical validation, not visual
  polish.
- iPhone is the first real-device testing target.
- Android support is required, but not before iOS BLE works.
- Expo development build is the default unless native configuration becomes too
  restrictive.
- No backend is needed for the first demo.
- No AI food recognition is needed for the first demo.
- All BLE protocol decisions should be validated against the real BOOKOO Themis
  Ultra before being treated as final.
