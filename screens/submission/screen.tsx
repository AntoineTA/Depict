import { StyleSheet, Text, View, Image } from "react-native";
import Animated from "react-native-reanimated";

import type { SubmissionScreenProps } from "@/types/types";

const SubmissionScreen = ({ route, navigation }: SubmissionScreenProps) => {
  const submission = route.params;

  return (
    <View style={styles.container}>
      {/* <Text>{submission.prompt}</Text> */}
      <Animated.Image
        source={{ uri: submission.imageURI }}
        // sharedTransitionTag="tag"
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};
export default SubmissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
