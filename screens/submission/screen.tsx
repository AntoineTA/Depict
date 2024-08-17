import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import type { SubmissionScreenProps } from "@/navigators/types";

const SubmissionScreen = ({ route }: SubmissionScreenProps) => {
  const submission = route.params;

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: submission.imageURI }}
        style={styles.image}
        sharedTransitionTag={`submission-${submission.date}`}
      />
    </View>
  );
};
export default SubmissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    alignSelf: "center",
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
});
