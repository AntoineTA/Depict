import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import type { Challenge } from "./screen";

type RemainingCountdownProps = {
  challenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
  isCompleting: boolean;
};

const formatTime = (seconds: number) => {
  let time = new Date(0);
  time.setSeconds(seconds);
  return time.toISOString().substring(14, 19);
};

const RemainingCountdown = ({
  challenge,
  updateChallenge,
  isCompleting,
}: RemainingCountdownProps) => {
  const { colors } = useTheme();

  return (
    <CountdownCircleTimer
      isPlaying={!challenge.isFinished && !isCompleting}
      duration={challenge.duration}
      initialRemainingTime={challenge.secondsLeft}
      colors={
        challenge.isFinished
          ? (colors.surfaceDisabled as `rgba(${string})`)
          : (colors.primary as `rgba(${string})`)
      }
      size={100}
      strokeWidth={6}
      onComplete={() => {
        updateChallenge({ ...challenge, isFinished: true, secondsLeft: 0 });
      }}
      onUpdate={(remaining) => {
        updateChallenge({ ...challenge, secondsLeft: remaining });
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
