import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.column}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: 14,
    width: "100%",
  },
  container: {
    backgroundColor: "#F8FAFC",
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
