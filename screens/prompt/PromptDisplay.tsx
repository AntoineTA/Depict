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

  // fetching the revealed status from storage
  if (isRevealed === undefined) {
    return <Text>Loading...</Text>;
  }

  if (!isRevealed) {
    return (
      <Button
        title="Reveal"
        onPress={() => {
          setIsRevealed(true);
        }}
      />
    );
  }

  if (isRevealed) {
    return (
      <>
        <Text>Revealed!</Text>
        <Button
          title="Reset"
          onPress={() => {
            setIsRevealed(undefined);
            AsyncStorage.removeItem("isRevealed");
          }}
        />
      </>
    );
  }
};
export default PromptDisplay;
