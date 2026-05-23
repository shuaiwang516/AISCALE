# Product Context: Discreet AI Meal Scale

## 1. Product Summary

The product is a discreet, AI-powered meal tracking system that combines food weight, photo-based food recognition, and personalized nutrition guidance.

The long-term vision is to build a small, portable, screenless smart food scale that can be placed under a plate or food container in public eating environments. The scale connects to a mobile app via Bluetooth. The app receives real-time weight data, combines it with user-provided food photos or text input, estimates calories and nutrition, and provides personalized dietary suggestions based on the user's goals.

The initial MVP will not involve custom hardware. Instead, the first version will use an existing Bluetooth-enabled scale, preferably a compact coffee scale with accessible BLE data, and connect it to a custom mobile app.

The core product insight is that many people are willing to track food intake at home, but feel embarrassed or uncomfortable using a visible food scale in public. Existing food scales are usually too large, too obvious, and socially awkward to use in restaurants, cafeterias, offices, or group dining settings. This product aims to reduce that social friction by making meal weighing discreet, private, and app-driven.

---

## 2. Core Product Positioning

### Short Positioning

A discreet AI meal scale for real-life eating.

### Longer Positioning

A screenless, portable smart scale and AI nutrition app that helps users track what they actually eat by combining weight data, food photos, and personalized dietary goals.

### Differentiation

Most food tracking apps rely on manual input or photo-based estimation. Photo-only estimation is often inaccurate because it cannot reliably determine food weight. Traditional kitchen scales are more accurate, but they are awkward to use outside the home.

This product combines:

- Real weight data from a Bluetooth scale
- AI food recognition from photos
- Manual correction when needed
- Before-and-after meal weight comparison
- Personalized nutrition guidance
- A discreet hardware form factor designed for social environments

The key difference is not only accuracy, but also privacy and social acceptability.

---

## 3. Problem Statement

Food tracking is useful for weight loss, fitness, blood sugar awareness, and general nutrition management, but existing solutions have major usability problems.

### Existing App Problems

Food tracking apps often require users to:

- Search food databases manually
- Estimate portion sizes
- Enter serving sizes
- Correct inaccurate food matches
- Log meals repeatedly every day

This creates friction and causes many users to quit.

### Existing Scale Problems

Traditional food scales are:

- Too large
- Too visible
- Clearly recognizable as dieting or fitness tools
- Usually designed for kitchens, not public eating
- Awkward to use in restaurants or cafeterias
- Not privacy-friendly in social situations

### Photo-Only AI Problems

AI photo-based nutrition apps can identify food categories, but they often fail to estimate accurate portion size. A photo of rice, pasta, meat, or salad does not reliably reveal its weight.

### Core User Pain

Users want more accurate nutrition tracking, but they do not want to look strange, obsessive, or socially awkward when eating outside.

The product solves this by making food weighing discreet and integrating it naturally into the meal logging flow.

---

## 4. Target Users

### Primary Users

#### 1. Fitness and Weight Loss Users

People who already understand the value of calorie and macro tracking but find it difficult to maintain consistency outside the home.

Common needs:

- Accurate calorie tracking
- Protein, carbohydrate, and fat estimation
- Meal logging with less effort
- Support for restaurant meals and cafeteria meals
- Reduced embarrassment when weighing food publicly

#### 2. Asian / Chinese Food Consumers

Users who frequently eat Asian meals, Chinese dishes, rice bowls, noodles, hot pot, stir-fry dishes, or takeout meals.

This is an important target segment because many mainstream Western nutrition databases handle Asian meals poorly. Asian meals often involve mixed ingredients, sauces, hidden oils, shared dishes, and rice/noodle portions that are difficult to estimate visually.

Common needs:

- Better handling of rice, noodles, stir-fried dishes, soups, and mixed plates
- More realistic calorie estimation for oily or sauced foods
- Ability to combine weight and photo recognition
- Cultural food database support in the future

#### 3. Blood Sugar / Carb Awareness Users

Users who want to manage carbohydrate intake or make more informed food decisions.

Important note: The product should avoid medical claims in early versions. It should focus on nutrition awareness, carb awareness, and habit tracking rather than claiming to treat diabetes, reduce blood sugar, or replace medical advice.

---

## 5. Use Cases

### Use Case 1: Restaurant Meal Tracking

The user places a small screenless scale under a plate or container. The app connects to the scale and records the starting weight. The user takes a photo of the food. After eating, the user weighs the remaining food again. The app calculates the actual consumed weight and uses AI to estimate calories and nutrients.

### Use Case 2: Office Lunch

The user eats lunch at work and wants to track food intake without drawing attention. The scale looks like a small coaster, food pad, or plate base rather than a typical kitchen scale. All interaction happens on the phone.

### Use Case 3: Cafeteria Meal

The user gets food from a cafeteria or dining hall. The app records the weight of the meal and uses a photo to estimate food composition. The user can manually correct food type if the AI result is wrong.

### Use Case 4: Takeout Meal

The user places a takeout box on the scale, photographs the meal, and logs the actual eaten amount. This is especially useful when the user does not finish the entire portion.

### Use Case 5: Home Meal Prep

The product can also be used like a normal food scale at home, but home use is not the main differentiator. The strongest differentiator is discreet public or semi-public usage.

---

## 6. MVP Strategy

The first MVP should not involve custom hardware manufacturing.

The goal is to validate:

- Whether users actually want discreet food weighing
- Whether users are willing to use the product outside the home
- Whether weight plus photo improves trust in nutrition estimates
- Whether users are willing to pay for the app or future hardware
- Whether the Bluetooth data pipeline is technically feasible

### MVP Hardware

Use an existing Bluetooth-enabled scale.

Preferred categories:

1. Bluetooth coffee scale
2. Compact espresso scale
3. Portable screenless or low-profile food scale
4. Existing smart nutrition scale as a fallback

Coffee scales are especially attractive because they are usually compact, accurate, responsive, and more likely to have BLE integration or developer community support.

### Recommended MVP Device Types

Potential hardware candidates for MVP testing:

- BOOKOO Themis Mini / Themis Ultra
- Acaia Pearl / Pearl Model S
- Acaia Lunar
- Decent Scale / Decent Open Scale
- Other compact Bluetooth coffee scales
- RENPHO / Etekcity / HOTO smart food scales for competitive testing, not necessarily primary integration

The MVP should prioritize devices with accessible Bluetooth Low Energy data, developer documentation, or existing reverse-engineering references.

---

## 7. MVP App Scope

The MVP mobile app should be intentionally simple.

### Required MVP Features

#### Bluetooth Scale Connection

The app should be able to:

- Scan nearby BLE devices
- Connect to the selected scale
- Receive real-time weight data
- Display live weight
- Handle disconnection and reconnection
- Support tare / zeroing if the scale protocol allows it

#### Meal Logging Flow

The app should support the following flow:

1. Connect to scale
2. Place plate or container on scale
3. Tare if needed
4. Add food
5. Record initial weight
6. Take or upload food photo
7. Optionally enter food description manually
8. Eat meal
9. Record remaining weight
10. Calculate consumed weight
11. Estimate calories and nutrition
12. Provide simple dietary feedback

#### AI Food Analysis

The app should use AI to:

- Identify food items from image
- Estimate food composition
- Combine visual analysis with weight data
- Estimate calories
- Estimate macronutrients:
  - Protein
  - Carbohydrates
  - Fat
- Provide confidence level or uncertainty
- Ask for user correction when uncertain

#### Personalized Guidance

The app should generate basic meal feedback based on:

- User's body information
- User's dietary goal
- Current meal estimate
- Daily intake progress

Example goals:

- Weight loss
- Muscle gain
- General healthy eating
- Carb awareness
- Lower-calorie eating
- Higher-protein eating

Early versions should avoid strong medical or treatment claims.

---

## 8. Suggested MVP User Flow

```text
Open App
  ↓
Connect Bluetooth Scale
  ↓
Place Plate / Container
  ↓
Tare
  ↓
Add Food
  ↓
Record Starting Weight
  ↓
Take Food Photo
  ↓
AI Detects Food
  ↓
User Confirms or Edits Food Type
  ↓
User Eats
  ↓
Record Remaining Weight
  ↓
App Calculates Consumed Weight
  ↓
AI Estimates Nutrition
  ↓
App Provides Meal Summary and Next-Meal Suggestion
```

---

## 9. AI Behavior Requirements

The AI should not pretend to be perfectly accurate.

The app should communicate uncertainty clearly.

### AI Output Should Include

- Estimated food items
- Estimated consumed weight
- Estimated calories
- Estimated protein
- Estimated carbs
- Estimated fat
- Confidence level
- User-editable assumptions
- Simple explanation of the estimate
- Suggested next action

### Example AI Output

```text
Estimated meal:
- Chicken rice bowl
- Consumed weight: 430g
- Estimated calories: 620 kcal
- Protein: 38g
- Carbs: 72g
- Fat: 18g
- Confidence: Medium

Suggestion:
This meal is relatively carb-heavy. If your goal is fat loss, consider making your next meal higher in protein and vegetables, with a smaller starch portion.
```

### AI Should Avoid

- Diagnosing medical conditions
- Claiming to treat diabetes, high cholesterol, or blood sugar problems
- Giving medication advice
- Presenting uncertain estimates as exact facts
- Overly restrictive or unhealthy diet recommendations

---

## 10. Hardware Vision

The long-term hardware product should be small, thin, screenless, and discreet.

### Desired Hardware Characteristics

- Screenless
- Bluetooth-enabled
- Low-profile
- Portable
- Rechargeable battery
- Water-resistant surface
- Easy to clean
- Looks like a coaster, food pad, plate base, or minimalist table accessory
- Does not visually resemble a traditional food scale
- Works under plates, bowls, and takeout containers
- Stable enough for restaurant use
- Accurate enough for nutrition tracking

### Possible Hardware Form Factors

#### Option A: Thin Round Plate Base

A circular device placed under a plate.

Potential benefits:

- Natural under-plate form factor
- Looks less like a scale
- Stable for plates and bowls
- Easy user mental model

Potential issues:

- Larger than pocket-sized
- Needs good weight distribution handling

#### Option B: Thin Square Meal Pad

A square or rounded-square pad similar to a coaster or mini tray.

Potential benefits:

- Easier to manufacture
- Easier to package
- More compatible with food containers

Potential issues:

- May look more like a device
- Plate overhang could affect stability

#### Option C: Foldable Multi-Point Scale

A compact foldable structure with three or four weight points.

Potential benefits:

- Highly portable
- More flexible for different plate sizes

Potential issues:

- Mechanically complex
- Higher risk of instability
- Harder to make elegant

---

## 11. Technical Considerations

### Bluetooth Low Energy

The app will likely need to support BLE communication.

Core BLE tasks:

- Scan devices
- Filter devices by name or service UUID
- Connect to device
- Discover services and characteristics
- Subscribe to notifications
- Decode weight data
- Send tare command if supported
- Handle reconnect logic

### BLE Protocol Risk

Many consumer smart scales use closed Bluetooth protocols. Some devices may require reverse engineering.

For MVP, prioritize scales with:

- Public API
- Open BLE protocol
- Existing GitHub libraries
- Developer community support
- Simple notification-based weight data

### Weight Stability

The app should not use raw readings directly. It should smooth and stabilize data.

Possible logic:

- Moving average
- Stability window
- Ignore sudden spikes
- Detect stable weight after N seconds
- Require manual confirmation for meal snapshots

### Plate and Container Handling

Because the product may be used under plates or containers, the app should support:

- Tare empty plate
- Record full plate
- Record remaining food
- Calculate consumed weight
- Support negative corrections
- Warn when weight is unstable

### Accuracy Expectations

For consumer nutrition tracking, perfect precision is not required.

Acceptable MVP target:

- 1g to 5g resolution if supported by hardware
- Stable enough for before/after meal weight comparison
- Better than photo-only estimation

---

## 12. Competitive Landscape

The product overlaps with several existing categories but has a distinct positioning.

### Category 1: Smart Nutrition Scales

Examples:

- Etekcity smart nutrition scales
- RENPHO smart food scale
- Greater Goods nutrition scale
- HOTO smart kitchen scale

Strengths:

- Affordable
- Already available
- Useful for home kitchens
- Often include nutrition databases

Weaknesses:

- Usually too large for public use
- Often have visible displays
- Not designed for discreet restaurant use
- App experience may be basic
- Not focused on AI meal analysis

### Category 2: AI Food Tracking Apps

Examples:

- MyFitnessPal Meal Scan
- MacroFactor
- Cal AI
- Fooducate
- Lose It
- Cronometer
- Garmin Connect Nutrition

Strengths:

- No hardware needed
- Large food databases
- Strong existing user bases
- Mature subscription models

Weaknesses:

- Photo-only portion estimates can be inaccurate
- Manual logging is tedious
- Not optimized for discreet weighing
- Limited handling of complex Asian meals

### Category 3: Bluetooth Coffee Scales

Examples:

- Acaia
- BOOKOO
- Decent Scale
- Timemore
- Varia
- OutIn

Strengths:

- Compact
- Accurate
- Often responsive
- Some have BLE access
- Good for MVP technical validation

Weaknesses:

- Designed for coffee, not meals
- May not support large plates well
- May be expensive
- Not positioned as nutrition products

### Product Opportunity

The opportunity is to combine:

- The accuracy of weight-based tracking
- The convenience of AI photo analysis
- The privacy of a screenless discreet device
- A meal-focused app experience

The product should not compete only as a cheaper food scale or another calorie app. It should compete as the most discreet and realistic meal tracking system for people who eat outside the home.

---

## 13. Business Model

### Early MVP

The early MVP can be app-first.

Possible monetization:

- Free beta for testers
- Paid pilot group
- Subscription after validation
- Future hardware waitlist
- Preorder campaign after demand validation

### Future Business Model

Potential pricing:

| Product | Possible Price |
|---|---:|
| App Free Tier | $0 |
| App Pro Subscription | $6.99–$9.99/month |
| Hardware Standard Version | $39–$59 |
| Hardware Premium Version | $79–$99 |
| Hardware + App Bundle | $79–$119 |

The ideal long-term model is hardware as acquisition and app subscription as recurring revenue.

---

## 14. Validation Plan

### Phase 1: Problem Validation

Interview at least 20 target users.

Questions to ask:

- Do you currently track food?
- Have you ever used a food scale?
- Would you use a food scale outside the home?
- What makes public food weighing uncomfortable?
- Would a small screenless under-plate scale reduce embarrassment?
- Would you trust food estimates more if AI had weight data?
- How often do you eat outside?
- What meals are hardest to track?
- Would you pay for this?
- Would you prefer app-only, hardware-only, or app-plus-hardware?

### Phase 2: MVP Technical Validation

Use an existing Bluetooth scale.

Validate:

- Can the app connect to the scale?
- Can real-time weight be read?
- Can the app record stable weight snapshots?
- Can tare be controlled or handled?
- Is the BLE connection reliable?
- Does the form factor work under plates?
- Is the reading stable with real meals?

### Phase 3: Behavioral Validation

Give prototypes to 5 to 10 users.

Ask users to test in:

- Home
- Office
- Cafeteria
- Restaurant
- Takeout setting

Measure:

- Did they actually use it?
- Did they feel embarrassed?
- Did other people notice?
- Was the flow too annoying?
- Did the AI result feel useful?
- Did they want to continue using it?

### Phase 4: Payment Validation

Create a landing page with waitlist or preorder intent.

Test price points:

- $39
- $59
- $79
- $99

Measure:

- Email signup rate
- Survey completion rate
- Willingness to preorder
- Willingness to pay for subscription
- Which user segment converts best

---

## 15. MVP Success Criteria

The MVP should be considered promising if:

- Users understand the value proposition quickly
- At least 40% of testers use it repeatedly over one week
- Users report lower embarrassment compared to visible food scales
- Users trust estimates more when weight is included
- Users are willing to pay for the app or hardware
- The BLE integration is stable enough for demos
- The meal logging flow can be completed in under 60 seconds before eating

Suggested early metrics:

| Metric | Target |
|---|---:|
| 7-day active usage among testers | 40%+ |
| Average meal logs per active day | 2+ |
| Meal logging completion time | < 60 seconds |
| Users willing to pay $5–$10/month | 20%+ |
| Users interested in hardware | 50%+ |
| Users willing to join waitlist | 30%+ |

---

## 16. Product Principles

### 1. Privacy First

The product should make users feel that their eating habits are private.

### 2. Discreet by Design

The hardware should not look like a traditional food scale.

### 3. Weight-Calibrated AI

The product should use weight data to make AI nutrition estimates more trustworthy.

### 4. Low Friction

Meal logging must be fast. If the process feels like homework, users will quit.

### 5. Editable, Not Overconfident

AI estimates should be easy to correct.

### 6. Public Eating Friendly

The product should work for real eating situations, not only idealized kitchen workflows.

### 7. Avoid Medical Claims

The product can support nutrition awareness and habit building, but should not claim to diagnose, treat, or cure medical conditions.

---

## 17. Non-Goals for the First MVP

The MVP should not attempt to solve everything.

Do not build these in the first version:

- Custom hardware
- Built-in hardware camera
- Full medical nutrition system
- Doctor or dietitian replacement
- Complex social features
- Full food database from scratch
- Barcode scanning unless easy to add
- Apple Health integration unless needed for testing
- Full wearable integration
- Multi-user family accounts
- Restaurant menu database
- Perfect nutrition accuracy

The MVP should focus on:

- BLE scale connection
- Weight capture
- Food photo input
- AI nutrition estimation
- Before/after weight comparison
- Simple personalized advice

---

## 18. Future Roadmap

### Version 0: Research Prototype

- Existing Bluetooth scale
- Simple app or web app
- BLE weight reading
- Manual meal logging
- AI estimate via external model API
- Small tester group

### Version 1: MVP App

- Stable BLE connection
- Meal photo logging
- Food correction UI
- Consumed weight calculation
- Calorie and macro estimation
- Daily goal tracking
- Basic AI meal feedback

### Version 2: Private Beta

- Better onboarding
- User goal setup
- Meal history
- Weight trend tracking
- Asian food support
- Improved AI prompts and nutrition logic
- Feedback loop for correcting food estimates

### Version 3: Hardware Prototype

- Screenless low-profile scale
- Custom enclosure
- BLE firmware
- Rechargeable battery
- Water-resistant surface
- Plate/container stability testing

### Version 4: Public Launch

- App subscription
- Hardware bundle
- Waitlist launch
- Influencer testing
- Fitness and Asian food creator partnerships
- User-generated food correction data

---

## 19. Technical Architecture: MVP

### Mobile App

Recommended stack options:

#### Option A: React Native

Good for cross-platform development.

Possible libraries:

- `react-native-ble-plx` for BLE
- Expo or bare React Native depending on BLE requirements
- Camera module for photo capture
- API client for backend communication

#### Option B: Native iOS First

Good if initial testers are mostly iPhone users.

Possible tools:

- Swift
- CoreBluetooth
- Vision / Photos APIs
- Native camera flow

#### Option C: Web Prototype First

Good for non-BLE AI flow validation, but not ideal for actual BLE scale testing.

Possible stack:

- Next.js
- Mobile web UI
- Manual weight input
- AI image analysis
- Fastest for landing page and workflow testing

### Backend

Possible stack:

- Node.js / Express
- PostgreSQL
- Prisma
- Object storage for food images
- AI model API integration
- Nutrition database integration

### Core Backend Entities

Possible data models:

```text
User
Meal
MealImage
ScaleReading
FoodItemEstimate
NutritionEstimate
UserGoal
DailyNutritionSummary
Device
```

### Meal Data Model Concept

```text
Meal
- id
- user_id
- timestamp
- meal_type
- image_url
- starting_weight_g
- remaining_weight_g
- consumed_weight_g
- user_description
- ai_detected_foods
- calories_estimate
- protein_g
- carbs_g
- fat_g
- confidence_score
- user_corrections
- ai_feedback
```

---

## 20. BLE Integration Notes

When implementing BLE support, the agent should expect device-specific protocols.

General BLE workflow:

```text
scanForPeripherals
  ↓
filter target scale
  ↓
connect
  ↓
discover services
  ↓
discover characteristics
  ↓
subscribe to weight characteristic
  ↓
decode byte payload
  ↓
update live weight state
  ↓
detect stable reading
  ↓
save meal weight snapshot
```

The decoding logic may vary by scale.

For MVP, create an abstraction layer:

```text
ScaleAdapter
- connect()
- disconnect()
- getLiveWeight()
- tare()
- onWeightChange(callback)
- getBatteryLevel()
- getDeviceInfo()
```

Each scale should have its own adapter:

```text
BookooScaleAdapter
AcaiaScaleAdapter
DecentScaleAdapter
MockScaleAdapter
ManualInputScaleAdapter
```

This keeps the app flexible if one hardware device becomes difficult to support.

---

## 21. Suggested Initial Repository Structure

```text
/
├── README.md
├── docs/
│   ├── product-context.md
│   ├── mvp-scope.md
│   ├── ble-integration-notes.md
│   ├── ai-nutrition-logic.md
│   └── user-research-notes.md
├── apps/
│   ├── mobile/
│   └── web/
├── packages/
│   ├── shared-types/
│   ├── scale-adapters/
│   └── nutrition-core/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── tests/
└── prototypes/
    ├── ble-scanner/
    └── ai-meal-estimator/
```

---

## 22. Agent Development Instructions

When building this product, prioritize the following order:

1. Validate BLE scale connectivity
2. Build a simple meal logging flow
3. Add manual weight input fallback
4. Add photo upload
5. Add AI food recognition
6. Combine AI estimate with weight
7. Add before/after weight difference
8. Add simple nutrition summary
9. Add user goal setup
10. Add personalized meal feedback

Do not overbuild UI, social features, or full nutrition databases before validating the core workflow.

The first usable prototype should answer one question:

Can a user discreetly record a real meal using weight plus photo in less than 60 seconds?

---

## 23. Key Product Hypotheses

### Hypothesis 1

Users who care about food tracking avoid using food scales outside the home because visible weighing is socially awkward.

### Hypothesis 2

A small, screenless, under-plate scale will reduce embarrassment enough for users to use it in public or semi-public settings.

### Hypothesis 3

Weight data will make AI nutrition estimates feel more trustworthy than photo-only estimates.

### Hypothesis 4

Before-and-after meal weighing is more realistic for restaurant meals than ingredient-by-ingredient weighing.

### Hypothesis 5

Asian food consumers are underserved by mainstream nutrition tracking tools.

### Hypothesis 6

The app can eventually monetize through a combination of hardware sales and recurring AI nutrition subscription.

---

## 24. Important Constraints

### Hardware Constraint

Do not design custom hardware before validating demand with existing devices.

### UX Constraint

The meal logging flow must be fast and socially acceptable.

### AI Constraint

AI outputs must be editable and uncertainty-aware.

### Health Claim Constraint

Avoid claims that the product treats, cures, diagnoses, or manages medical conditions in a clinical sense.

### Business Constraint

Do not build a low-margin hardware-only business. The long-term business should include recurring app revenue.

---

## 25. One-Sentence Product Description

A discreet AI-powered meal tracking system that uses Bluetooth weight data and food photos to estimate what users actually eat and provide personalized nutrition guidance.

---

## 26. Current MVP Direction

The immediate next step is to purchase or test an existing Bluetooth-enabled scale, preferably a compact coffee scale with accessible BLE data, and build a simple mobile app that can:

- Connect to the scale
- Read live weight
- Record meal weight before eating
- Capture food photo
- Record remaining weight after eating
- Estimate consumed nutrition using AI
- Provide simple personalized feedback

Custom hardware should only be considered after user behavior and willingness to pay are validated.
