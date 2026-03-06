import * as Updates from "expo-updates";
import { useEffect } from "react";
import RootNavigation from "./views/root-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { useThemeStore } from "./stores/theme/theme.store";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { TanstackQuery } from "./tanstack-query";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const { theme } = useThemeStore();

  useEffect(() => {
    Updates.checkForUpdateAsync();
  }, []);

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);
  const [fontsLoaded] = useFonts({});

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <TanstackQuery>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={theme}>
            <KeyboardProvider>
              <RootNavigation />
            </KeyboardProvider>
            <Toast />
          </ApplicationProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </TanstackQuery>
  );
}
