import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  Prompt: undefined;
  GalleryTabStack: undefined;
};

export type GalleryTabStackParamList = {
  Gallery: undefined;
  Image: undefined;
};

export type GalleryScreenProps = NativeStackScreenProps<
  GalleryTabStackParamList,
  "Gallery"
>;
