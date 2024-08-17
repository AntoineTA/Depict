import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChallengeScreen from "@/screens/challenge/screen";
import GalleryNavigator from "../gallery/navigator";

import type { RootNavigatorParamList } from "@/navigators/types";

const RootNavigator = () => {
  const Tab = createMaterialBottomTabNavigator<RootNavigatorParamList>();

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
        name="GalleryNavigator"
        component={GalleryNavigator}
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
export default RootNavigator;
