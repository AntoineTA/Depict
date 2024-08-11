import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GalleryScreen from "@/screens/GalleryScreen";

import type { GalleryTabStackParamList } from "@/types";

const GalleryTabStack = () => {
  const Stack = createNativeStackNavigator<GalleryTabStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
};
export default GalleryTabStack;
