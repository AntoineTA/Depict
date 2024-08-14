import { Dimensions } from "react-native";
import * as Haptics from "expo-haptics";

import { useTheme } from "react-native-paper";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { Challenge } from "./screen";

type RevealButtonProps = {
  challenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
};

const RevealButton = ({ challenge, updateChallenge }: RevealButtonProps) => {
  const { colors, fonts } = useTheme();

  return (
    <SwipeButton
      title="Swipe to reveal"
      Icon={
        <MaterialCommunityIcons
          name="chevron-double-right"
          size={24}
          color={colors.onPrimary}
        />
      }
      onComplete={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        updateChallenge({ ...challenge, isRevealed: true });
      }}
      width={Dimensions.get("window").width * 0.7}
      height={60}
      circleBackgroundColor={colors.primary}
      underlayStyle={{
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        backgroundColor: colors.primaryContainer,
        marginLeft: 1,
      }}
      containerStyle={{
        backgroundColor: colors.surfaceVariant,
      }}
      titleContainerStyle={{ marginLeft: "10%" }}
      titleStyle={{
        color: colors.onSurfaceVariant,
        ...fonts.labelLarge,
      }}
    />
  );
};
export default RevealButton;
