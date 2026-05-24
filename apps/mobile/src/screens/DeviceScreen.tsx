import { StyleSheet, Text, View } from "react-native";

import { DeviceRow } from "../components/DeviceRow";
import { PrimaryActionButton } from "../components/PrimaryActionButton";
import { Screen } from "../components/Screen";
import { SecondaryActionButton } from "../components/SecondaryActionButton";
import { StatusBanner } from "../components/StatusBanner";
import { useScaleManager } from "../hooks/useScaleManager";

export function DeviceScreen() {
  const { state, scan, stopScan, connect, disconnect } = useScaleManager();
  const isScanning = state.connectionState === "scanning";
  const isConnecting = state.connectionState === "connecting";
  const isConnected = state.connectionState === "connected";

  return (
    <Screen>
      <StatusBanner state={state} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bluetooth permission</Text>
        <Text style={styles.body}>{state.bluetoothPermissionStatus}</Text>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Mock/dev path</Text>
        <Text style={styles.noticeText}>
          Simulator validation uses mock or manual sources only. This is not a real BOOKOO
          connection.
        </Text>
      </View>

      <View style={styles.actions}>
        {isScanning ? (
          <SecondaryActionButton label="Stop" onPress={stopScan} />
        ) : (
          <PrimaryActionButton disabled={isConnecting} label="Scan" onPress={scan} />
        )}
        <SecondaryActionButton disabled={!isConnected} label="Disconnect" onPress={disconnect} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovered devices</Text>
        {state.discoveredDevices.length === 0 ? (
          <Text style={styles.body}>No devices scanned yet.</Text>
        ) : (
          <View style={styles.deviceList}>
            {state.discoveredDevices.map((device) => (
              <DeviceRow
                key={`${device.adapterId}-${device.id}`}
                connected={state.connectedDevice?.id === device.id}
                connecting={isConnecting}
                device={device}
                onConnect={connect}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection state</Text>
        <Text style={styles.body}>{state.connectionState}</Text>
        {state.lastError ? <Text style={styles.error}>{state.lastError}</Text> : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  body: {
    color: "#53616E",
    fontSize: 14,
    letterSpacing: 0,
  },
  deviceList: {
    gap: 10,
  },
  error: {
    color: "#9B1C1C",
    fontSize: 14,
    letterSpacing: 0,
    marginTop: 6,
  },
  notice: {
    backgroundColor: "#FFF8E6",
    borderColor: "#E8C15E",
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  noticeText: {
    color: "#4F3A00",
    fontSize: 14,
    letterSpacing: 0,
  },
  noticeTitle: {
    color: "#4F3A00",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0,
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
