import { Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { SwipeButton } from "@arelstone/react-native-swipe-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RevealButtonProps = {
  changeRevealStatus: (status: boolean) => void;
};

const RevealButton = ({ changeRevealStatus }: RevealButtonProps) => {
  const colors = useTheme().colors;
  const fonts = useTheme().fonts;

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
        changeRevealStatus(true);
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
        // fontSize: 18,
      }}
    />
  );
};
export default RevealButton;
