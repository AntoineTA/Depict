import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { loadSubmissionsAsync, Submission } from "@/utils/submissionManager";

import type { GalleryScreenProps } from "@/types/types";

const GalleryScreen = ({ navigation }: GalleryScreenProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // On component mount, load the submissions from local storage
  useEffect(() => {
    (async () => {
      try {
        setSubmissions(await loadSubmissionsAsync());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {submissions.length != 0 &&
        submissions.map((submission, index) => (
          <View key={index}>
            <Text>{submission.prompt}</Text>
            <Text>{submission.date.toString()}</Text>
            <Text>{submission.timeTaken}</Text>
            <Text>{submission.imageURI}</Text>
            <Image
              source={{ uri: submission.imageURI }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        ))}
      {!submissions.length && <Text>No submissions yet!</Text>}
    </View>
  );
};
export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
