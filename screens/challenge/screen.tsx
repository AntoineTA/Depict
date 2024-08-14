import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import Animated, {
  BounceInLeft,
  BounceInRight,
  FadeOutDown,
} from "react-native-reanimated";

import { prompts } from "@/constants/prompts";
import RevealButton from "./RevealButton";
import RemainingCountdown from "./RemainingCountdown";
import CameraButton from "./CameraButton";

export type Challenge = {
  promptIndex: number;
  isRevealed: boolean;
  secondsLeft: number;
  isFinished: boolean;
  isCompleted: boolean;
};

const ChallengeScreen = () => {
  const challengeDuration = 15;
  const [challenge, setChallenge] = useState<Challenge>({
    promptIndex: 0,
    isRevealed: false,
    secondsLeft: challengeDuration,
    isFinished: false,
    isCompleted: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false); //track if the user is completing the challenge

  const computePromptIndex = () => {
    const startDate = new Date("2024-08-11");
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysSinceStart % prompts.length;
  };

  const updateChallenge = async (newChallenge: Challenge) => {
    try {
      setChallenge(newChallenge);
      await AsyncStorage.setItem("challenge", JSON.stringify(newChallenge));
    } catch (e) {
      console.error(e);
    }
  };

  const getChallenge = async () => {
    try {
      const challengeJSON = await AsyncStorage.getItem("challenge");
      return challengeJSON ? JSON.parse(challengeJSON) : null;
    } catch (e) {
      console.error(e);
    }
  };

  const refreshChallenge = async () => {
    if (!challenge.isRevealed) return;

    const currentIndex = computePromptIndex();
    if (currentIndex === challenge.promptIndex) return;

    setRefreshing(true);
    await updateChallenge({
      promptIndex: currentIndex,
      isRevealed: false,
      secondsLeft: challengeDuration,
      isFinished: false,
      isCompleted: false,
    });
    setRefreshing(false);
  };

  // On mount, load the challenge from storage
  useEffect(() => {
    (async () => {
      const currentIndex = computePromptIndex();
      const storedChallenge = await getChallenge();

      // If there is no challenge or the challenge is outdated, start a new one
      if (!storedChallenge || storedChallenge.promptIndex !== currentIndex) {
        await updateChallenge({
          promptIndex: currentIndex,
          isRevealed: false,
          secondsLeft: challengeDuration,
          isFinished: false,
          isCompleted: false,
        });
        setIsLoading(false);
        return;
      }

      // If the challenge is still valid, loads it
      setChallenge(storedChallenge);
      setIsLoading(false);
    })();
  }, []);

  const animDuration = 800;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshChallenge} />
      }
    >
      <View style={styles.headline}>
        <Text variant="headlineSmall">Prompt of the day</Text>
      </View>

      <View style={styles.main}>
        {isLoading && <ActivityIndicator style={styles.main} size="large" />}
        {!isLoading && challenge.isRevealed && (
          <>
            <Animated.View entering={BounceInLeft.duration(animDuration)}>
              <Text
                variant="displayLarge"
                style={{
                  fontFamily: "Merriweather_900Black",
                  textTransform: "capitalize",
                }}
              >
                {prompts[challenge.promptIndex]}
              </Text>
            </Animated.View>

            <Animated.View
              style={styles.actions}
              entering={BounceInRight.duration(animDuration)}
            >
              {
                <RemainingCountdown
                  {...{
                    challenge,
                    updateChallenge,
                    duration: challengeDuration,
                    isCompleting,
                  }}
                />
              }
              <CameraButton
                {...{
                  challenge,
                  updateChallenge,
                  isCompleting,
                  setIsCompleting,
                }}
              />
            </Animated.View>
          </>
        )}
      </View>

      <View style={styles.bottom}>
        {!isLoading && !challenge.isRevealed && (
          <Animated.View exiting={FadeOutDown}>
            <RevealButton {...{ challenge, updateChallenge }} />
          </Animated.View>
        )}
        {!isLoading && challenge.isFinished && !challenge.isCompleted && (
          <View style={styles.bottomText}>
            <Text variant="titleMedium">You ran out of time!</Text>
            <Text variant="bodyLarge">
              Come back tomorrow for a new challenge.
            </Text>
          </View>
        )}
        {!isLoading && challenge.isFinished && challenge.isCompleted && (
          <View style={styles.bottomText}>
            <Text variant="titleMedium">Well done!</Text>
            <Text variant="bodyLarge">
              Your picture has been saved to the gallery.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default ChallengeScreen;

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
  actions: {
    marginTop: 30,
    height: "75%",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "violet",
  },
  bottom: {
    height: Dimensions.get("window").height * 0.1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightblue",
    alignSelf: "center",
  },
  bottomText: {
    alignItems: "center",
    justifyContent: "center",
  },
});
