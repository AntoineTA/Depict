import { Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

import type { Submission } from "@/utils/submissionManager";

type ThumbnailProps = {
  submission: Submission;
  onPress: () => void;
};

const Thumbnail = ({ submission, onPress }: ThumbnailProps) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      style={styles.thumbnail}
      sharedTransitionTag={`submission-${submission.date}`}
    >
      <Pressable onPress={onPress}>
        <Image source={{ uri: submission.imageURI }} style={styles.image} />
        <Text
          style={[
            styles.prompt,
            {
              backgroundColor: colors.background,
              color: colors.onBackground,
            },
          ]}
          variant="labelLarge"
        >
          {submission.prompt} ·{" "}
          {new Date(submission.date).toString().substring(4, 10)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
export default Thumbnail;
const styles = StyleSheet.create({
  thumbnail: {
    width: Dimensions.get("window").width * 0.47,
    height: Dimensions.get("window").width * 0.47,
    margin: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
  },
  prompt: {
    position: "absolute",
    bottom: 0,
    margin: 5,
    padding: 3,
    borderRadius: 5,
    textTransform: "capitalize",
  },
});
