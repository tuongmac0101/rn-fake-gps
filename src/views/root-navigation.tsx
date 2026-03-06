import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "./public/login";
import { ForgotPasswordView } from "./public/forgot-password";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { VerifyCodeView } from "./public/verify-code";
import { ResetPasswordView } from "./public/reset-password";
import { HomeTabs } from "./main/home-tabs";
import { AuthGate } from "./auth-gate";
import { DemoView } from "./public/demo";
import { useTheme } from "@ui-kitten/components";
import { buildThemeNavigation } from "~/stores/theme/helper";
import { useThemeStore } from "~/stores/theme/theme.store";
import { NSOrder } from "~/common/enums";
import { ICustomer, ICustomerAddress } from "~/api/customer/types";

const RootStack = createNativeStackNavigator({
  initialRouteName: "AuthGate",
  screens: {
    AuthGate: {
      screen: AuthGate,
      options: {
        headerShown: false,
      },
    },
    LoginView: {
      screen: LoginView,
      options: {
        headerShown: false,
      },
    },
    ForgotPasswordView: {
      screen: ForgotPasswordView,
      options: {
        headerShown: false,
      },
    },
    VerifyCodeView: {
      screen: VerifyCodeView,
      options: {
        headerShown: false,
      },
    },
    ResetPasswordView: {
      screen: ResetPasswordView,
      options: {
        headerShown: false,
      },
    },
    DemoView: {
      screen: DemoView,
    },
    //#region Main
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
    interface RootParamList extends RootStackParamList {
    }
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
