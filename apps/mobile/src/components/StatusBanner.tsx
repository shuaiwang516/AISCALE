import { StyleSheet, Text, View } from "react-native";

import { ScaleManagerState } from "../bluetooth/types";
import { formatWeight } from "../utils/format";

type StatusBannerProps = {
  state: ScaleManagerState;
};

export function StatusBanner({ state }: StatusBannerProps) {
  return (
    <View style={styles.container}>
      <StatusRow label="State" value={state.connectionState} />
      <StatusRow label="Device" value={state.connectedDevice?.name ?? "--"} />
      <StatusRow label="Weight" value={formatWeight(state.lastReading?.grams)} />
      <StatusRow label="Error" value={state.lastError ?? "None"} valueStyle={state.lastError ? styles.error : undefined} />
    </View>
  );
}

type StatusRowProps = {
  label: string;
  value: string;
  valueStyle?: object;
};

function StatusRow({ label, value, valueStyle }: StatusRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text numberOfLines={1} style={[styles.value, valueStyle]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F7FA",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    gap: 6,
    padding: 12,
  },
  error: {
    color: "#9B1C1C",
  },
  label: {
    color: "#53616E",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    width: 64,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 22,
  },
  value: {
    color: "#15202B",
    flex: 1,
    fontSize: 14,
    letterSpacing: 0,
  },
});
