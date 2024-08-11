import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PromptScreen = () => {
  const [isRevealed, setIsRevealed] = useState<boolean | undefined>(undefined);

  //fetch the revealed status from async storage on component mount
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("isRevealed");
        setIsRevealed(value === "true");
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  //save the revealed status to async storage whenver it changes
  useEffect(() => {
    if (isRevealed !== undefined) {
      (async () => {
        try {
          const value = isRevealed ? "true" : "false"; //convert boolean to string
          await AsyncStorage.setItem("isRevealed", value);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [isRevealed]);

  if (isRevealed === undefined) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>PromptScreen</Text>
      {!isRevealed && (
        <Button
          title="Reveal"
          onPress={() => {
            setIsRevealed(true);
          }}
        />
      )}
      {isRevealed && <Text>Revealed!</Text>}

      {/* Dev only */}
      <Button
        title="Reset"
        onPress={() => {
          setIsRevealed(undefined);
          AsyncStorage.removeItem("isRevealed");
        }}
      />
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
