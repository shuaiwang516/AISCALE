import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinkingOptions, NavigationContainer, Theme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DebugScreen } from "./src/screens/DebugScreen";
import { DeviceScreen } from "./src/screens/DeviceScreen";
import { LiveWeightScreen } from "./src/screens/LiveWeightScreen";
import { MealCaptureScreen } from "./src/screens/MealCaptureScreen";

type RootTabParamList = {
  Device: undefined;
  "Live Weight": undefined;
  "Meal Capture": undefined;
  Debug: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const linking: LinkingOptions<RootTabParamList> = {
  prefixes: ["smart-scale-demo://"],
  config: {
    screens: {
      Device: "device",
      "Live Weight": "live-weight",
      "Meal Capture": "meal-capture",
      Debug: "debug",
    },
  },
};

const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: "#0B5CAD",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#15202B",
    border: "#D8E0E8",
    notification: "#B91C1C",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "800",
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={navigationTheme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="Device"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTitleStyle: {
              color: "#15202B",
              fontSize: 18,
              fontWeight: "800",
              letterSpacing: 0,
            },
            tabBarActiveTintColor: "#0B5CAD",
            tabBarInactiveTintColor: "#53616E",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "700",
              letterSpacing: 0,
            },
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              borderTopColor: "#D8E0E8",
              minHeight: 58,
              paddingBottom: 8,
              paddingTop: 6,
            },
          }}
        >
          <Tab.Screen component={DeviceScreen} name="Device" />
          <Tab.Screen component={LiveWeightScreen} name="Live Weight" />
          <Tab.Screen component={MealCaptureScreen} name="Meal Capture" />
          <Tab.Screen component={DebugScreen} name="Debug" />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
