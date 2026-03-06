import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { HomeTabs } from "./main/home-tabs";
import { useTheme } from "@ui-kitten/components";
import { buildThemeNavigation } from "~/stores/theme/helper";
import { useThemeStore } from "~/stores/theme/theme.store";

const RootStack = createNativeStackNavigator({
  initialRouteName: "HomeTabs",
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const StaticNavigation = createStaticNavigation(RootStack);

const RootNavigation = () => {
  const theme = useTheme();
  const themeMode = useThemeStore((state) => state.themeMode);
  const navTheme = buildThemeNavigation(themeMode, theme);

  return <StaticNavigation theme={navTheme} />;
};

export default RootNavigation;
