import { ScrollView, StyleSheet, Text, View } from "react-native";

import { DebugLogEntry } from "../bluetooth/types";
import { formatTimestamp } from "../utils/format";

type DebugLogProps = {
  title: string;
  entries: DebugLogEntry[];
  categories?: DebugLogEntry["category"][];
  emptyLabel: string;
};

export function DebugLog({ title, entries, categories, emptyLabel }: DebugLogProps) {
  const filteredEntries = categories
    ? entries.filter((entry) => categories.includes(entry.category))
    : entries;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.logBox}>
        {filteredEntries.length === 0 ? (
          <Text style={styles.empty}>{emptyLabel}</Text>
        ) : (
          filteredEntries.map((entry) => (
            <Text key={entry.id} selectable style={styles.entry}>
              {formatTimestamp(entry.timestamp)} [{entry.category}] {entry.message}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  empty: {
    color: "#6B7785",
    fontSize: 13,
    letterSpacing: 0,
  },
  entry: {
    color: "#1F2A33",
    fontFamily: "Courier",
    fontSize: 12,
    letterSpacing: 0,
    marginBottom: 6,
  },
  logBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    maxHeight: 180,
    minHeight: 120,
    padding: 10,
  },
  title: {
    color: "#15202B",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0,
  },
});
