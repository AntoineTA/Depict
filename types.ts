import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Prompt: undefined;
  Gallery: undefined;
};

export type PromptScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Prompt"
>;
export type GalleryScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Gallery"
>;
