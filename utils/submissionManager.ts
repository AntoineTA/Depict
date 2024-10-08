import AsyncStorage from "@react-native-async-storage/async-storage";

export type Submission = {
  imageURI: string;
  date: number; // unix timestamp
  promptIndex: number;
  prompt: string;
  timeTaken: number;
};

export const loadSubmissionsAsync = async (): Promise<Submission[]> => {
  try {
    const submissionsJSON = await AsyncStorage.getItem("submissions");
    const submissions = submissionsJSON ? JSON.parse(submissionsJSON) : [];
    return submissions;
  } catch (e) {
    throw e;
  }
};
export default loadSubmissionsAsync;
