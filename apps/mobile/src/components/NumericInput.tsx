import { StyleSheet, Text, TextInput, View } from "react-native";

type NumericInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string | null;
};

export function NumericInput({
  label,
  value,
  onChangeText,
  placeholder = "0.0",
  error,
}: NumericInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, error && styles.inputError]}
        value={value}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  error: {
    color: "#9B1C1C",
    fontSize: 13,
    letterSpacing: 0,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#9CAAB8",
    borderRadius: 6,
    borderWidth: 1,
    color: "#15202B",
    fontSize: 16,
    letterSpacing: 0,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: "#B91C1C",
  },
  label: {
    color: "#1F2A33",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0,
  },
});
