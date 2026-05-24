import { StyleSheet, Text, View } from "react-native";

import { ScaleDevice } from "../bluetooth/types";
import { SecondaryActionButton } from "./SecondaryActionButton";

type DeviceRowProps = {
  device: ScaleDevice;
  connected: boolean;
  connecting: boolean;
  onConnect: (device: ScaleDevice) => void;
};

export function DeviceRow({ device, connected, connecting, onConnect }: DeviceRowProps) {
  const supportedLabel = device.isLikelySupported ? "Likely supported" : "Not verified";

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.name}>{device.name ?? "Unnamed device"}</Text>
        <Text style={styles.meta}>ID: {device.id}</Text>
        <Text style={styles.meta}>RSSI: {device.rssi ?? "--"}</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{device.adapterLabel}</Text>
          <Text style={[styles.badge, device.isLikelySupported ? styles.supported : styles.unverified]}>
            {supportedLabel}
          </Text>
        </View>
      </View>
      <SecondaryActionButton
        disabled={connected || connecting}
        label={connected ? "Connected" : "Connect"}
        onPress={() => onConnect(device)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#E8EEF5",
    borderRadius: 6,
    color: "#1F2A33",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0E8",
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 116,
    padding: 12,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  meta: {
    color: "#53616E",
    fontSize: 13,
    letterSpacing: 0,
  },
  name: {
    color: "#15202B",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
  },
  supported: {
    backgroundColor: "#DCF7E3",
    color: "#14532D",
  },
  unverified: {
    backgroundColor: "#FFF4D6",
    color: "#6B4E00",
  },
});
