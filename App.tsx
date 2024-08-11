import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import BottomTab from "./navigators/BottomTab";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </PaperProvider>
  );
}
