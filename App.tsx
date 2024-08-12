import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import BottomTab from "./navigators/BottomTab";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
