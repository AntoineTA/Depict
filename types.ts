import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  PromptStack: undefined;
  GalleryStack: undefined;
};

export type PromptStackParamList = {
  Reveal: undefined;
  Prompt: undefined;
};

export type GalleryStackParamList = {
  Gallery: undefined;
};

export type RevealScreenProps = NativeStackScreenProps<
  PromptStackParamList,
  "Reveal"
>;
