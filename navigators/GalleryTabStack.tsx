import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GalleryScreen from "@/screens/gallery/screen";
import SubmissionScreen from "@/screens/submission/screen";

import type { GalleryTabStackParamList } from "@/types/types";

const GalleryTabStack = () => {
  const Stack = createNativeStackNavigator<GalleryTabStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Submission" component={SubmissionScreen} />
    </Stack.Navigator>
  );
};
export default GalleryTabStack;
