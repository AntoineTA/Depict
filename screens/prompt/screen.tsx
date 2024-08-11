import { Button, StyleSheet, Text, View } from "react-native";
import PromptDisplay from "./PromptDisplay";

const PromptScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PromptScreen</Text>
      <PromptDisplay />
    </View>
  );
};
export default PromptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
