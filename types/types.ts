import type { Submission } from "@/utils/submissionManager";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  ChallengeScreen: undefined;
  GalleryTabStack: undefined;
};

export type GalleryTabStackParamList = {
  Gallery: undefined;
  Submission: Submission;
};

export type GalleryScreenProps = NativeStackScreenProps<
  GalleryTabStackParamList,
  "Gallery"
>;

export type SubmissionScreenProps = NativeStackScreenProps<
  GalleryTabStackParamList,
  "Submission"
>;
