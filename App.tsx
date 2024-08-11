import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PromptScreen from "./screens/prompt/PromptScreen";
import GalleryScreen from "./screens/gallery/GalleryScreen";

type BottomTabParamList = {
  Prompt: undefined;
  Gallery: undefined;
};

export default function App() {
  const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Prompt"
            component={PromptScreen}
            options={{
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
            name="Gallery"
            component={GalleryScreen}
            options={{
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
