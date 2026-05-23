# React Native Demo UI Requirements

## 1. UI Goal

The first React Native app UI must behave like a strict BLE test tool for the
BOOKOO Themis Ultra meal-scale workflow.

The UI should be clean, readable, and reliable, but not polished like a
consumer launch app. Its purpose is to make hardware testing repeatable:

- Scan for the scale.
- Connect to the scale.
- Show live weight.
- Capture starting and remaining meal weights.
- Calculate consumed weight.
- Inspect raw BLE data when something fails.

## 2. Required Navigation

The app must have exactly these primary views for the first demo:

1. Device
2. Live Weight
3. Meal Capture
4. Debug

Use tabs, a segmented control, or a simple header navigation pattern. The user
must be able to reach all four views without hidden gestures or nested menus.

Do not add onboarding, marketing, profile, settings, history, nutrition, or AI
analysis screens in the first demo.

## 3. Global Layout Rules

- Use a plain app shell with a top title and the current connection state.
- Use one primary content column.
- Keep all important controls reachable on a phone screen without horizontal
  scrolling.
- Use stable dimensions for buttons, status rows, reading panels, and action
  areas so the layout does not jump when weight values update.
- Use simple system colors and high contrast.
- Use a light theme by default.
- Keep text short and operational.
- Use grams as the default unit.
- Show timestamps in local device time for debug and last-reading information.
- Every disabled action must have visible disabled styling.
- Every error state must show a short, actionable message.

## 4. Required Global Status

Every primary view must show:

- Connection state: `idle`, `scanning`, `connecting`, `connected`,
  `disconnected`, or `error`
- Connected device name when available
- Last live weight when available
- Last error message when available

The current live weight must always be formatted consistently:

```text
123.4 g
```

If no reading exists:

```text
--.- g
```

## 5. Device View Requirements

Purpose: scan for and connect to the BOOKOO Themis Ultra.

Required elements:

- Bluetooth permission status
- Scan button
- Stop scan button while scanning
- List of discovered devices
- Device row showing name, device ID, RSSI if available, and whether it looks
  like a BOOKOO device
- Connect button for each discovered device
- Disconnect button when connected
- Connection state message
- Last error message

Restrictions:

- Do not auto-connect without a visible user action.
- Do not hide non-BOOKOO devices during early debugging; mark likely BOOKOO
  devices instead.
- Do not remove raw device IDs from the UI because they are useful during BLE
  debugging.

## 6. Live Weight View Requirements

Purpose: prove that live BLE weight updates are working.

Required elements:

- Large live weight display
- Stability state: `stable`, `unstable`, or `unknown`
- Last updated timestamp
- Tare button
- App-level zero button if hardware tare is not confirmed
- Disconnect button
- Small recent-reading list with at least the latest 5 decoded readings

Restrictions:

- Do not animate the main weight value.
- Do not round away useful precision. Show one decimal place when available.
- Do not hide unstable readings.
- Do not capture meal weights from this screen; capture belongs in Meal
  Capture.

## 7. Meal Capture View Requirements

Purpose: validate before-and-after meal weighing.

Required elements:

- Current live weight
- Start weight value
- Remaining weight value
- Consumed weight value
- Record start weight button
- Record remaining weight button
- Reset meal button
- Manual start weight input
- Manual remaining weight input
- Clear manual input button
- Warning when recording an unstable reading

Calculation:

```text
consumed_weight_g = max(starting_weight_g - remaining_weight_g, 0)
```

Required display states:

- No start weight recorded
- Start weight recorded, waiting for remaining weight
- Both weights recorded
- Manual input mode active
- Invalid manual input

Restrictions:

- Do not add calorie or macro estimates in this view.
- Do not require photos for this first demo.
- Do not block capture just because the reading is unstable; warn the user and
  allow manual confirmation.
- Do not allow consumed weight to display as a negative number.

## 8. Debug View Requirements

Purpose: make BLE protocol work observable.

Required elements:

- Connected device name and ID
- Discovered services
- Discovered characteristics
- Raw notification payload log
- Decoded weight log
- Tare command payload and result
- Clear logs button
- Copy logs button if available on the platform

Restrictions:

- Do not prettify away raw hex/base64 payloads.
- Do not truncate logs so aggressively that recent payloads are lost.
- Do not make Debug the default landing view unless the app is launched in a
  development/debug mode.

## 9. Component Rules

Use a small set of simple reusable components:

- `StatusBanner`
- `PrimaryActionButton`
- `SecondaryActionButton`
- `ReadingPanel`
- `DeviceRow`
- `DebugLog`
- `NumericInput`

Component restrictions:

- Components must not own BLE logic.
- Components must receive state through props.
- Components must call explicit action callbacks.
- Components must not directly decode payloads or calculate meal values.

## 10. Copy Rules

Use short operational labels:

- `Scan`
- `Stop`
- `Connect`
- `Disconnect`
- `Tare`
- `Zero in app`
- `Record start`
- `Record remaining`
- `Reset`
- `Clear logs`

Avoid consumer marketing copy:

- Do not use claims like "AI-powered nutrition coach" in this demo.
- Do not use medical or blood-sugar claims.
- Do not describe nutrition estimates as precise.
- Do not include subscription, pricing, or launch messaging.

## 11. Visual Restrictions

The first demo UI must not include:

- Landing pages
- Hero sections
- Decorative gradients
- Decorative blobs or orbs
- Marketing cards
- Nested cards
- Illustrations unrelated to the live scale workflow
- Animations that obscure live readings
- Gamified progress visuals
- Social or sharing UI
- Food photos or AI result mockups
- Nutrition dashboard mockups

Cards are allowed only for functional panels such as current reading, device
rows, meal values, and debug logs.

## 12. Accessibility and Usability Requirements

- Buttons must have clear text labels.
- Touch targets must be at least 44px tall.
- Text must not overlap or truncate critical values.
- Weight readings must remain readable while changing quickly.
- Error messages must be visible without opening a modal.
- The app must remain usable if BLE is unavailable by using manual input.

## 13. Acceptance Criteria

The UI is acceptable when:

- A tester can connect to the scale without developer guidance.
- A tester can see whether the app is connected, scanning, or errored.
- A tester can confirm live weight updates.
- A tester can record start and remaining weights.
- A tester can calculate consumed weight.
- A developer can inspect raw BLE payloads from the app.
- No screen suggests unavailable AI, nutrition, backend, account, or launch
  features.
