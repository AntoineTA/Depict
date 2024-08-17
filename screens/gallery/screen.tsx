import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { loadSubmissionsAsync, Submission } from "@/utils/submissionManager";
import Thumbnail from "./Thumbnail";

import type { GalleryScreenProps } from "@/navigators/types";

const GalleryScreen = ({ navigation }: GalleryScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // On component focus
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
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
      setIsLoading(false);
    }, []),
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && submissions.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleMedium">No submissions yet!</Text>
        <Text variant="bodyMedium" style={{ alignSelf: "center" }}>
          Go to the Challenge tab to get started.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        numColumns={2}
        renderItem={({ item: submission }) => (
          <Thumbnail
            submission={submission}
            onPress={() => navigation.navigate("Submission", submission)}
          />
        )}
        style={{ width: "100%" }}
        contentContainerStyle={
          submissions.length > 1
            ? { alignItems: "center" }
            : { alignItems: "flex-start" }
        }
      />
    </View>
  );
};
export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});
