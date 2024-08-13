import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import type { Challenge } from "./screen";

type RemainingCountdownProps = {
  challenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
};

const formatTime = (seconds: number) => {
  let time = new Date(0);
  time.setSeconds(seconds);
  return time.toISOString().substring(14, 19);
};

const RemainingCountdown = ({
  challenge,
  updateChallenge,
}: RemainingCountdownProps) => {
  const { colors } = useTheme();

  return (
    <CountdownCircleTimer
      isPlaying
      duration={300}
      initialRemainingTime={challenge.secondsLeft}
      colors={colors.primary as `rgba(${string})`}
      size={100}
      strokeWidth={6}
      onComplete={() => {
        updateChallenge({ ...challenge, secondsLeft: 0, isFinished: true });
      }}
      onUpdate={(remaining) => {
        if (remaining % 10 === 0 && remaining >= 10) {
          updateChallenge({ ...challenge, secondsLeft: remaining }); // Update remaining time every 10 seconds
        }
      }}
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
