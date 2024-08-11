import { Button, StyleSheet, Text, View } from "react-native";

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GalleryScreen</Text>
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
