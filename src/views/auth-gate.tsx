import { useEffect, useRef } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "~/stores/auth.store";
import { useUserStore } from "~/stores/user.store";
import { KitSpinner } from "~/@ui-kit";
import { useMasterDataStore } from "~/stores/master-data";
import { useBranchMappingStore } from "~/stores/branch-mapping";
import { useSystemCodeStore } from "~/stores/system-code";

export const AuthGate = () => {
  const nav = useNavigation(); // keep your typing if you have it
  const { access_token, isHydrated } = useAuthStore();
  const { getUserProfile } = useUserStore();
  const { loadListAddress, loadSystemCodes } = useMasterDataStore();
  const { loadBranchMappings } = useBranchMappingStore();
  const { loadPriceTypes } = useSystemCodeStore();

  // Prevent duplicate navigations (StrictMode/double-effects, rapid store changes)
  const didNavigateRef = useRef(false);

  // Single safe reset helper (idempotent)
  const safeReset = (routeName: string, params?: any) => {
    if (didNavigateRef.current) return;
    didNavigateRef.current = true;
    nav.reset({
      index: 0,
      routes: [{ name: routeName as never, params }],
    });
  };

  useEffect(() => {
    // Wait until persist has rehydrated
    if (!isHydrated || didNavigateRef.current) return;

    let cancelled = false; // cancel flag to avoid acting after unmount

    const run = async () => {
      try {
        await Promise.all([
          loadListAddress(),
          loadSystemCodes(),
        ]);
        if (access_token) {
          // Load profile first; if it throws (e.g., 401), go Login
          await getUserProfile();
          await Promise.all([
            loadBranchMappings(),
            loadPriceTypes(),
          ]);
          if (cancelled) return;
          safeReset("HomeTabs");
        } else {
          if (cancelled) return;
          safeReset("LoginView");
        }
      } catch {
        if (cancelled) return;
        safeReset("LoginView");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isHydrated, access_token, getUserProfile, nav]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <KitSpinner size="large" />
    </View>
  );
};
