import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PromptScreen from "./screens/prompt/PromptScreen";
import GalleryScreen from "./screens/gallery/GalleryScreen";
import RevealScreen from "./screens/reveal/RevealScreen";

import type {
  BottomTabParamList,
  GalleryStackParamList,
  PromptStackParamList,
} from "./types";

const PromptStack = createNativeStackNavigator<PromptStackParamList>();
const PromptStackScreen = () => {
  return (
    <PromptStack.Navigator screenOptions={{ headerShown: false }}>
      <PromptStack.Screen name="Reveal" component={RevealScreen} />
      <PromptStack.Screen name="Prompt" component={PromptScreen} />
    </PromptStack.Navigator>
  );
};

const GalleryStack = createNativeStackNavigator<GalleryStackParamList>();
const GalleryStackScreen = () => {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen name="Gallery" component={GalleryScreen} />
    </GalleryStack.Navigator>
  );
};

export default function App() {
  const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="PromptStack"
            component={PromptStackScreen}
            options={{
              title: "Prompt",
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="camera"
                    color={color}
                    size={26}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="camera-outline"
                    color={color}
                    size={26}
                  />
                ),
            }}
          />
          <Tab.Screen
            name="GalleryStack"
            component={GalleryStackScreen}
            options={{
              title: "Gallery",
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="image-multiple"
                    color={color}
                    size={26}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="image-multiple-outline"
                    color={color}
                    size={26}
                  />
                ),
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
