import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NumericInput } from "../components/NumericInput";
import { PrimaryActionButton } from "../components/PrimaryActionButton";
import { ReadingPanel } from "../components/ReadingPanel";
import { Screen } from "../components/Screen";
import { SecondaryActionButton } from "../components/SecondaryActionButton";
import { StatusBanner } from "../components/StatusBanner";
import { useScaleManager } from "../hooks/useScaleManager";
import { calculateConsumedWeight, parseManualWeight } from "../meal/mealWeights";
import { formatStability, formatWeight } from "../utils/format";

export function MealCaptureScreen() {
  const { state } = useScaleManager();
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [remainingWeight, setRemainingWeight] = useState<number | null>(null);
  const [manualStart, setManualStart] = useState("");
  const [manualRemaining, setManualRemaining] = useState("");
  const [captureWarning, setCaptureWarning] = useState<string | null>(null);

  const manualStartWeight = parseManualWeight(manualStart);
  const manualRemainingWeight = parseManualWeight(manualRemaining);
  const manualStartInvalid = manualStart.trim().length > 0 && manualStartWeight === null;
  const manualRemainingInvalid = manualRemaining.trim().length > 0 && manualRemainingWeight === null;
  const manualMode = manualStart.trim().length > 0 || manualRemaining.trim().length > 0;
  const effectiveStart = manualStartWeight ?? startWeight;
  const effectiveRemaining = manualRemainingWeight ?? remainingWeight;
  const consumedWeight = calculateConsumedWeight(effectiveStart, effectiveRemaining);
  const liveReading = state.connectionState === "connected" ? state.lastReading : null;

  const stateMessage = useMemo(() => {
    if (manualStartInvalid || manualRemainingInvalid) {
      return "Invalid manual input";
    }

    if (manualMode) {
      return "Manual input mode active";
    }

    if (startWeight === null) {
      return "No start weight recorded";
    }

    if (remainingWeight === null) {
      return "Start weight recorded, waiting for remaining weight";
    }

    return "Both weights recorded";
  }, [manualMode, manualRemainingInvalid, manualStartInvalid, remainingWeight, startWeight]);

  function recordStart(): void {
    if (!liveReading) {
      setCaptureWarning("No live reading available. Use manual start weight.");
      return;
    }

    setStartWeight(liveReading.grams);
    setCaptureWarning(
      liveReading.stable ? null : "Recorded an unstable reading. Confirm manually if needed.",
    );
  }

  function recordRemaining(): void {
    if (!liveReading) {
      setCaptureWarning("No live reading available. Use manual remaining weight.");
      return;
    }

    setRemainingWeight(liveReading.grams);
    setCaptureWarning(
      liveReading.stable ? null : "Recorded an unstable reading. Confirm manually if needed.",
    );
  }

  function resetMeal(): void {
    setStartWeight(null);
    setRemainingWeight(null);
    setManualStart("");
    setManualRemaining("");
    setCaptureWarning(null);
  }

  function clearManualInput(): void {
    setManualStart("");
    setManualRemaining("");
  }

  return (
    <Screen>
      <StatusBanner state={state} />

      <ReadingPanel
        detail={`Stability: ${formatStability(liveReading?.stable)}`}
        label="Current live weight"
        value={formatWeight(liveReading?.grams)}
      />

      <View style={styles.grid}>
        <ReadingPanel label="Start weight" value={formatWeight(effectiveStart)} />
        <ReadingPanel label="Remaining weight" value={formatWeight(effectiveRemaining)} />
      </View>

      <ReadingPanel
        detail={stateMessage}
        label="Consumed weight"
        large
        value={formatWeight(consumedWeight)}
      />

      {captureWarning ? <Text style={styles.warning}>{captureWarning}</Text> : null}

      <View style={styles.actions}>
        <PrimaryActionButton label="Record start" onPress={recordStart} />
        <PrimaryActionButton label="Record remaining" onPress={recordRemaining} />
        <SecondaryActionButton label="Reset" onPress={resetMeal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual weights</Text>
        <NumericInput
          error={manualStartInvalid ? "Enter a non-negative number." : null}
          label="Manual start weight"
          onChangeText={setManualStart}
          value={manualStart}
        />
        <NumericInput
          error={manualRemainingInvalid ? "Enter a non-negative number." : null}
          label="Manual remaining weight"
          onChangeText={setManualRemaining}
          value={manualRemaining}
        />
        <SecondaryActionButton
          disabled={!manualMode}
          label="Clear manual input"
          onPress={clearManualInput}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
  },
  grid: {
    gap: 10,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: "#15202B",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
  warning: {
    backgroundColor: "#FFF4D6",
    borderColor: "#D8A800",
    borderRadius: 6,
    borderWidth: 1,
    color: "#5C4100",
    fontSize: 14,
    letterSpacing: 0,
    padding: 10,
  },
});
