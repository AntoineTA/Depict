import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChallengeScreen from "@/screens/challenge/screen";
import GalleryTabStack from "./GalleryTabStack";

import type { BottomTabParamList } from "@/types/types";

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{
          title: "Challenge",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
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
        name="GalleryTabStack"
        component={GalleryTabStack}
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
  );
};
export default BottomTab;
