import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import GalleryScreen from "@/screens/gallery/screen";
import SubmissionScreen from "@/screens/submission/screen";
import AppBar from "@/components/AppBar";

import type { GalleryTabStackParamList } from "@/types/types";

const GalleryTabStack = () => {
  const { colors } = useTheme();
  const Stack = createNativeStackNavigator<GalleryTabStackParamList>();

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
export default GalleryTabStack;
