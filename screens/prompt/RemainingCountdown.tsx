import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { MD3LightTheme } from "react-native-paper";

type RemainingCountdownProps = {
  setIsCompleted: (status: boolean) => void;
};

const formatTime = (seconds: number) => {
  let time = new Date(0);
  time.setSeconds(seconds);
  return time.toISOString().substring(14, 19);
};

const RemainingCountdown = ({ setIsCompleted }: RemainingCountdownProps) => {
  const { colors } = useTheme();

  return (
    <CountdownCircleTimer
      isPlaying
      duration={300}
      colors={colors.primary as `rgba(${string})`}
      onComplete={() => setIsCompleted(true)}
      size={100}
      strokeWidth={6}
    >
      {({ remainingTime }) => (
        <View
          style={{
            flex: 1,
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Text
            variant="labelLarge"
            style={{
              // fontSize: 16,
              textAlign: "center",
              lineHeight: 22,
              color: colors.onBackground,
            }}
          >
            {`${formatTime(remainingTime)}\nleft`}
          </Text>
        </View>
      )}
    </CountdownCircleTimer>
  );
};
export default RemainingCountdown;
