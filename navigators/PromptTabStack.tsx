import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RevealScreen from "@/screens/promptTab/RevealScreen";
import PromptScreen from "@/screens/promptTab/PromptScreen";

import type { PromptTabStackParamList } from "@/types";

const PromptTabStack = () => {
  const Stack = createNativeStackNavigator<PromptTabStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Reveal" component={RevealScreen} />
      <Stack.Screen name="Prompt" component={PromptScreen} />
    </Stack.Navigator>
  );
};
export default PromptTabStack;
