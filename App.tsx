import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import {
  useFonts,
  Merriweather_900Black,
} from "@expo-google-fonts/merriweather";
import * as SplashScreen from "expo-splash-screen";

import RootNavigator from "./navigators/root/navigator";
import { useEffect } from "react";

export default function App() {
  const [loaded, error] = useFonts({
    Merriweather_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
