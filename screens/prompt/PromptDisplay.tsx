import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PromptDisplay = () => {
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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
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
export default PromptDisplay;
