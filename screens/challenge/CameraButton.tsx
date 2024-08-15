import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { prompts } from "@/constants/prompts";

import type { Sound } from "expo-av/build/Audio";
import type { Challenge } from "./screen";
import loadSubmissionsAsync from "@/utils/submissionManager";

type CameraButtonProps = {
  challenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
  isCompleting: boolean;
  setIsCompleting: (isCompleting: boolean) => void;
};

const CameraButton = ({
  challenge,
  updateChallenge,
  isCompleting,
  setIsCompleting,
}: CameraButtonProps) => {
  const [camPerm, requestCamPerm] = ImagePicker.useCameraPermissions();
  const [sound, setSound] = useState<Sound>();

  const handlePressed = async () => {
    setIsCompleting(true);

    try {
      if (!camPerm?.granted) {
        requestCamPerm();
        return;
      }
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        await submit(result.assets[0]);
        updateChallenge({ ...challenge, isCompleted: true, isFinished: true });
        playSound();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCompleting(false);
    }
  };

  const submit = async (image: ImagePicker.ImagePickerAsset) => {
    try {
      const outputURI = `${FileSystem.documentDirectory}/submissions/${image.fileName}`;

      // save the image in the app's directory for persistence
      await FileSystem.copyAsync({
        from: image.uri,
        to: outputURI,
      });

      // create a submission object and save it to AsyncStorage
      const submission = {
        imageURI: outputURI,
        date: challenge.date,
        promptIndex: challenge.promptIndex,
        prompt: prompts[challenge.promptIndex],
        timeTaken: challenge.duration - challenge.secondsLeft,
      };

      const submissions = await loadSubmissionsAsync();
      submissions.push(submission);
      await AsyncStorage.setItem("submissions", JSON.stringify(submissions));
    } catch (e) {
      throw e;
    }
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/success.mp3"),
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Button
      loading={isCompleting}
      icon="camera"
      mode="contained"
      disabled={challenge.isFinished}
      onPress={() => handlePressed()}
    >
      Take a photo
    </Button>
  );
};
export default CameraButton;
