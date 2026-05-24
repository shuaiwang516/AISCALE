import { StyleSheet, Text, View } from "react-native";

import { PrimaryActionButton } from "../components/PrimaryActionButton";
import { ReadingPanel } from "../components/ReadingPanel";
import { Screen } from "../components/Screen";
import { SecondaryActionButton } from "../components/SecondaryActionButton";
import { StatusBanner } from "../components/StatusBanner";
import { useScaleManager } from "../hooks/useScaleManager";
import { formatStability, formatTimestamp, formatWeight } from "../utils/format";

export function LiveWeightScreen() {
  const { state, tare, zeroInApp, disconnect } = useScaleManager();
  const connected = state.connectionState === "connected";
  const stability = formatStability(state.lastReading?.stable);

  return (
    <Screen>
      <StatusBanner state={state} />

      <ReadingPanel
        detail={`Stability: ${stability} | Updated: ${formatTimestamp(state.lastReading?.receivedAt)}`}
        label="Live weight"
        large
        value={formatWeight(state.lastReading?.grams)}
      />

      <View style={styles.actions}>
        <PrimaryActionButton
          disabled={!connected || !state.activeCapabilities?.hardwareTare}
          label="Tare"
          onPress={tare}
        />
        <SecondaryActionButton
          disabled={!connected || !state.activeCapabilities?.appZero || !state.lastReading}
          label="Zero in app"
          onPress={zeroInApp}
        />
        <SecondaryActionButton disabled={!connected} label="Disconnect" onPress={disconnect} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent readings</Text>
        {state.recentReadings.length === 0 ? (
          <Text style={styles.body}>No readings yet.</Text>
        ) : (
          state.recentReadings.slice(0, 5).map((reading) => (
            <View key={`${reading.receivedAt}-${reading.grams}`} style={styles.readingRow}>
              <Text style={styles.readingValue}>{formatWeight(reading.grams)}</Text>
              <Text style={styles.readingMeta}>
                {formatStability(reading.stable)} | {formatTimestamp(reading.receivedAt)}
              </Text>
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
  },
  body: {
    color: "#53616E",
    fontSize: 14,
    letterSpacing: 0,
  },
  readingMeta: {
    color: "#53616E",
    flex: 1,
    fontSize: 13,
    letterSpacing: 0,
    textAlign: "right",
  },
  readingRow: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  readingValue: {
    color: "#15202B",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
    width: 92,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    color: "#15202B",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
