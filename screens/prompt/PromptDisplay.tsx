import { Text } from "react-native-paper";
import { prompts } from "@/constants/prompts";

const PromptDisplay = () => {
  // get the index of the prompt to display based on the current date
  const startDate = new Date("2024-08-12");
  const today = new Date();
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const index = daysSinceStart % prompts.length;

  return (
    <Text
      variant="displayLarge"
      style={{
        fontFamily: "Merriweather_900Black",
        textTransform: "capitalize",
      }}
    >
      {prompts[index]}
    </Text>
  );
};
export default PromptDisplay;
