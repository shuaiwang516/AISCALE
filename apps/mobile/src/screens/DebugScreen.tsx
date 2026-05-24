import * as Clipboard from "expo-clipboard";
import { StyleSheet, Text, View } from "react-native";

import { DebugLog } from "../components/DebugLog";
import { PrimaryActionButton } from "../components/PrimaryActionButton";
import { Screen } from "../components/Screen";
import { SecondaryActionButton } from "../components/SecondaryActionButton";
import { StatusBanner } from "../components/StatusBanner";
import { useScaleManager } from "../hooks/useScaleManager";

export function DebugScreen() {
  const { state, clearLogs, getDebugText } = useScaleManager();

  async function copyLogs(): Promise<void> {
    await Clipboard.setStringAsync(getDebugText());
  }

  return (
    <Screen>
      <StatusBanner state={state} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected device</Text>
        <Text style={styles.body}>Name: {state.connectedDevice?.name ?? "--"}</Text>
        <Text style={styles.body}>ID: {state.connectedDevice?.id ?? "--"}</Text>
        <Text style={styles.body}>
          Adapter: {state.activeAdapterId ?? "--"} / {state.activeAdapterLabel}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovered services</Text>
        {state.discoveredServices.map((service) => (
          <Text key={service} selectable style={styles.mono}>
            {service}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovered characteristics</Text>
        {state.discoveredCharacteristics.map((characteristic) => (
          <Text key={characteristic} selectable style={styles.mono}>
            {characteristic}
          </Text>
        ))}
      </View>

      <DebugLog
        categories={["raw"]}
        emptyLabel="No raw notification payloads yet."
        entries={state.debugLogs}
        title="Raw notification payload log"
      />

      <DebugLog
        categories={["decoded"]}
        emptyLabel="No decoded weight readings yet."
        entries={state.debugLogs}
        title="Decoded weight log"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tare command</Text>
        <Text style={styles.body}>{state.lastTareResult ?? "No tare command sent."}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryActionButton label="Copy logs" onPress={copyLogs} />
        <SecondaryActionButton label="Clear logs" onPress={clearLogs} />
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
  mono: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    color: "#1F2A33",
    fontFamily: "Courier",
    fontSize: 12,
    letterSpacing: 0,
    padding: 10,
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
