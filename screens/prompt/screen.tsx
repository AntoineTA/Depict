import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

import Animated, {
  BounceInLeft,
  BounceInRight,
  FadeOutDown,
} from "react-native-reanimated";

import RevealButton from "./RevealButton";
import { prompts } from "@/constants/prompts";

const computePromptIndex = () => {
  const startDate = new Date("2024-08-12");
  const today = new Date();
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysSinceStart % prompts.length;
};

const PromptScreen = () => {
  const [isRevealed, setIsRevealed] = useState<boolean | undefined>(undefined);

  const changeRevealStatus = async (status: boolean) => {
    setIsRevealed(status);
    await AsyncStorage.setItem("isRevealed", status ? "true" : "false");
  };

  const promptIndex = computePromptIndex();
  const animDuration = 800;

  //On component mount
  useEffect(() => {
    (async () => {
      try {
        const storedIndex = await AsyncStorage.getItem("promptIndex");

        // if prompt indexed has changed, reset isRevealed, update storage and render the component
        if (storedIndex !== promptIndex.toString()) {
          await changeRevealStatus(false);
          await AsyncStorage.setItem("promptIndex", promptIndex.toString());
          return;
        }

        // if prompt index is the same, load isRevealed from storage
        const storedIsRevelead = await AsyncStorage.getItem("isRevealed");
        setIsRevealed(storedIsRevelead === "true");
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text variant="headlineSmall">Prompt of the day</Text>
      </View>

      <View style={styles.main}>
        {isRevealed === undefined && <ActivityIndicator size="large" />}

        {isRevealed === true && (
          <>
            <Animated.View entering={BounceInLeft.duration(animDuration)}>
              <Text
                variant="displayLarge"
                style={{
                  fontFamily: "Merriweather_900Black",
                  textTransform: "capitalize",
                }}
              >
                {prompts[promptIndex]}
              </Text>
            </Animated.View>

            <Animated.View
              style={styles.box}
              entering={BounceInRight.duration(animDuration)}
            ></Animated.View>
          </>
        )}
      </View>

      <View>
        {isRevealed === false && (
          <Animated.View exiting={FadeOutDown}>
            <RevealButton changeRevealStatus={changeRevealStatus} />
          </Animated.View>
        )}
      </View>
    </View>
  );
};
export default PromptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  headline: {
    marginTop: Dimensions.get("window").height * 0.1,
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },
  main: {
    height: Dimensions.get("window").height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "lightgrey",
  },
  box: {
    width: 200,
    height: "75%",
    justifyContent: "center",
    backgroundColor: "violet",
  },
});
