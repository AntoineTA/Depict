import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const AppBar = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content
        title={title}
        titleStyle={{ textTransform: "capitalize" }}
      />
    </Appbar.Header>
  );
};
export default AppBar;
