import { Button, StyleSheet, Text, View } from "react-native";
import type { RevealScreenProps } from "@/types";

const RevealScreen = ({ navigation }: RevealScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>RevealScreen</Text>
      <Button
        title="Go to Prompt"
        onPress={() => navigation.navigate("Prompt")}
      />
    </View>
  );
};
export default RevealScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
