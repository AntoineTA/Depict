import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import GalleryScreen from "@/screens/gallery/screen";
import SubmissionScreen from "@/screens/submission/screen";
import AppBar from "./AppBar";

import type { GalleryNavigatorParamList } from "@/navigators/types";

const GalleryNavigator = () => {
  const { colors } = useTheme();
  const Stack = createNativeStackNavigator<GalleryNavigatorParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Gallery"
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        contentStyle: { backgroundColor: colors.surface },
      }}
    >
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen
        name="Submission"
        component={SubmissionScreen}
        options={({ route }) => ({ title: route.params.prompt })}
      />
    </Stack.Navigator>
  );
};
export default GalleryNavigator;
