import { Button, StyleSheet, Text, View } from "react-native";
import type { PromptScreenProps } from "@/types";

const PromptScreen = ({ navigation }: PromptScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>PromptScreen</Text>
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
