import type { Submission } from "@/utils/submissionManager";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  ChallengeScreen: undefined;
  GalleryNavigator: undefined;
};

export type GalleryNavigatorParamList = {
  Gallery: undefined;
  Submission: Submission;
};

export type GalleryScreenProps = NativeStackScreenProps<
  GalleryNavigatorParamList,
  "Gallery"
>;

export type SubmissionScreenProps = NativeStackScreenProps<
  GalleryNavigatorParamList,
  "Submission"
>;
