import { Pressable, StyleSheet, Text } from "react-native";

type PrimaryActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryActionButton({ label, onPress, disabled = false }: PrimaryActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    borderRadius: 6,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  disabled: {
    backgroundColor: "#B8C2CC",
  },
  disabledLabel: {
    color: "#F4F6F8",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0,
  },
  pressed: {
    backgroundColor: "#084B8A",
  },
});
