import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Dimensions, Platform, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

import Animated, {
  BounceInLeft,
  BounceInRight,
  FadeOutDown,
} from "react-native-reanimated";
import RevealButton from "./RevealButton";

const PromptScreen = () => {
  const [isRevealed, setIsRevealed] = useState<boolean | undefined>(undefined);

  const duration = 800;

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

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text variant="headlineSmall">Prompt of the day</Text>
      </View>

      <View style={styles.main}>
        {isRevealed === undefined && <ActivityIndicator size="large" />}

        {isRevealed === true && (
          <>
            <Animated.View entering={BounceInLeft.duration(duration)}>
              <Text
                variant="displayLarge"
                style={{ fontFamily: "Merriweather_900Black" }}
              >
                Triumph
              </Text>
            </Animated.View>

            <Animated.View
              style={styles.box}
              entering={BounceInRight.duration(duration)}
            >
              {/* DEV */}
              <Button
                title="Reset"
                onPress={() => {
                  setIsRevealed(false);
                  // AsyncStorage.removeItem("isRevealed");
                }}
              />
            </Animated.View>
          </>
        )}
      </View>

      <View>
        {isRevealed === false && (
          <Animated.View exiting={FadeOutDown}>
            <RevealButton setIsRevealed={setIsRevealed} />
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
    backgroundColor: "lightgreen",
  },
  main: {
    height: Dimensions.get("window").height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
  },
  box: {
    width: 200,
    height: "75%",
    justifyContent: "center",
    backgroundColor: "violet",
  },
});
