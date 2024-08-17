import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import Animated from "react-native-reanimated";

import { loadSubmissionsAsync, Submission } from "@/utils/submissionManager";
import type { GalleryScreenProps } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const GalleryScreen = ({ navigation }: GalleryScreenProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const { colors } = useTheme();

  // On component focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          //load submissions
          const loadedSubmissions = await loadSubmissionsAsync();

          // Sort submissions by date descending
          loadedSubmissions.sort((a, b) => b.date - a.date);

          // update local state
          setSubmissions(loadedSubmissions);
        } catch (e) {
          console.error(e);
        }
      })();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        renderItem={({ item: submission }) => (
          <Animated.View
            style={styles.thumbnail}
            sharedTransitionTag="submissionImage"
          >
            <Pressable
              onPress={() => navigation.navigate("Submission", submission)}
            >
              <Image
                source={{ uri: submission.imageURI }}
                style={styles.image}
              />
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
                {submission.prompt}
              </Text>
            </Pressable>
          </Animated.View>
        )}
        numColumns={2}
      />

      {/* DEV */}
      <Button
        mode="contained"
        onPress={() => AsyncStorage.clear()}
        style={{ margin: 10 }}
      >
        Clear storage
      </Button>
    </View>
  );
};
export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  thumbnail: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.45,
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
