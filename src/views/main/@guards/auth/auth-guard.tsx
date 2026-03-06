import { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./use-auth";
import { KitSpinner } from "~/@ui-kit";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isUserLoaded } = useAuth();

  if (!isLoggedIn || !isUserLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <KitSpinner size="large" />
      </View>
    );
  }

  return children;
};
