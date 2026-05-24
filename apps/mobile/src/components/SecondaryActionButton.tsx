import { Pressable, StyleSheet, Text } from "react-native";

type SecondaryActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SecondaryActionButton({
  label,
  onPress,
  disabled = false,
}: SecondaryActionButtonProps) {
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
    backgroundColor: "#FFFFFF",
    borderColor: "#7A8A99",
    borderRadius: 6,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  disabled: {
    backgroundColor: "#EFF2F5",
    borderColor: "#CED6DE",
  },
  disabledLabel: {
    color: "#7A8A99",
  },
  label: {
    color: "#1F2A33",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0,
  },
  pressed: {
    backgroundColor: "#E8EEF5",
  },
});
