import { Button, StyleSheet, Text, View } from "react-native";
import type { GalleryScreenProps } from "@/types";

const GalleryScreen = ({ navigation }: GalleryScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>GalleryScreen</Text>
      <Button
        title="Navigate to Image"
        onPress={() => navigation.navigate("Image")}
      />
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
