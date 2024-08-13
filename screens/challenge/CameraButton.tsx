import { Button } from "react-native-paper";
import type { Challenge } from "./screen";
import * as ImagePicker from "expo-image-picker";

type CameraButtonProps = {
  challenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
};

const CameraButton = ({ challenge, updateChallenge }: CameraButtonProps) => {
  const [camPerm, requestCamPerm] = ImagePicker.useCameraPermissions();
  // const [libPerm, requestLibPerm] = ImagePicker.useMediaLibraryPermissions();
  const takePicture = async () => {
    if (!camPerm?.granted) {
      requestCamPerm();
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    console.log(result);
    if (!result.canceled) {
      updateChallenge({ ...challenge, isCompleted: true, secondsLeft: 0 });
    }
  };

  return (
    <Button
      icon="camera"
      mode="contained"
      disabled={challenge.secondsLeft === 0}
      onPress={() => takePicture()}
    >
      Take a photo
    </Button>
  );
};
export default CameraButton;
