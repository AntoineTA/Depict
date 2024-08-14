import { useState } from "react";
import { Button } from "react-native-paper";
import type { Challenge } from "./screen";
import * as ImagePicker from "expo-image-picker";

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

  const takePicture = async () => {
    setIsCompleting(true);

    if (!camPerm?.granted) {
      requestCamPerm();
      setIsCompleting(false);
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    console.log(result);
    if (!result.canceled) {
      updateChallenge({ ...challenge, isCompleted: true, isFinished: true });
    }
    setIsCompleting(false);
  };

  return (
    <Button
      loading={isCompleting}
      icon="camera"
      mode="contained"
      disabled={challenge.isFinished}
      onPress={() => takePicture()}
    >
      Take a photo
    </Button>
  );
};
export default CameraButton;
