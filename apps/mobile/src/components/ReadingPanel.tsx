import { StyleSheet, Text, View } from "react-native";

type ReadingPanelProps = {
  label: string;
  value: string;
  detail?: string;
  large?: boolean;
};

export function ReadingPanel({ label, value, detail, large = false }: ReadingPanelProps) {
  return (
    <View style={[styles.container, large && styles.largeContainer]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, large && styles.largeValue]}>{value}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    minHeight: 96,
    justifyContent: "center",
    padding: 14,
  },
  detail: {
    color: "#53616E",
    fontSize: 13,
    letterSpacing: 0,
    marginTop: 6,
  },
  label: {
    color: "#53616E",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    marginBottom: 6,
  },
  largeContainer: {
    minHeight: 136,
  },
  largeValue: {
    fontSize: 44,
  },
  value: {
    color: "#15202B",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
