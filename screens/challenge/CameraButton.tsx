import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

import type { Sound } from "expo-av/build/Audio";
import type { Challenge } from "./screen";

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
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [sound, setSound] = useState<Sound>();

  const handlePressed = async () => {
    setIsCompleting(true);

    try {
      if (!camPerm?.granted) {
        requestCamPerm();
        return;
      }
      const result = await ImagePicker.launchCameraAsync();

      console.log(result);
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
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

  const saveImage = async (imageURI: string) => {
    try {
      setImageURI(imageURI);
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
