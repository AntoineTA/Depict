import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GalleryScreen from "@/screens/gallery/screen";
import ImageScreen from "@/screens/image/screen";

import type { GalleryTabStackParamList } from "@/types";

const GalleryTabStack = () => {
  const Stack = createNativeStackNavigator<GalleryTabStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Image" component={ImageScreen} />
    </Stack.Navigator>
  );
};
export default GalleryTabStack;
