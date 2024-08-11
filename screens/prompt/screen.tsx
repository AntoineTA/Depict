import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PromptScreen = () => {
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
