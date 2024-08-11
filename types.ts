import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  PromptTabStack: undefined;
  GalleryTabStack: undefined;
};

export type PromptTabStackParamList = {
  Reveal: undefined;
  Prompt: undefined;
};

export type GalleryTabStackParamList = {
  Gallery: undefined;
};

export type RevealScreenProps = NativeStackScreenProps<
  PromptTabStackParamList,
  "Reveal"
>;
