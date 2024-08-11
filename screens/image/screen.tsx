import { StyleSheet, Text, View } from "react-native";
const ImageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ImageScreen</Text>
    </View>
  );
};
export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
