import { useNavigation, CommonActions } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

/**
 * Lấy params của một màn hình từ navigation state
 */
const getRouteParams = (
  navigation: NavigationProp<any>,
  screenName: string
): object | undefined => {
  const state = navigation.getState();
  const route = state.routes.find((r) => r.name === screenName);
  return route?.params;
};

/**
 * Reset stack và preserve params từ màn hình cũ
 */
const resetStackWithParams = (
  navigation: NavigationProp<any>,
  newStack: Array<string | { name: string; params?: object }>,
  preserveParamsFrom?: string[] // Tên các màn hình cần preserve params
) => {
  const formattedRoutes = newStack.map((route) => {
    if (typeof route === "string") {
      // Nếu cần preserve params, lấy từ state cũ
      if (preserveParamsFrom?.includes(route)) {
        const oldParams = getRouteParams(navigation, route);
        return { name: route, params: oldParams };
      }
      return { name: route };
    }
    return route;
  });

  navigation.dispatch(
    CommonActions.reset({
      index: formattedRoutes.length - 1,
      routes: formattedRoutes,
    })
  );
};

/**
 * Hook giúp reset navigation về HomeTabs
 * và focus vào 1 tab cụ thể.
 */

const tabNamesMap = {
  HomeTabView: 0,
  OrderManagementTabView: 1,
  ApprovalOrderTabView: 2,
  ProfileTabView: 3,
};
export const useCustomNavigation = () => {
  const nav = useNavigation<NavigationProp<any>>();

  const resetToHomeTab = (targetTabName: keyof typeof tabNamesMap) => {
    const targetIndex = tabNamesMap[targetTabName];

    nav.dispatch(
      CommonActions.reset({
        index: 0, // HomeTabs là màn đầu tiên trong RootStack
        routes: [
          {
            name: "HomeTabs",
            state: {
              routes: Object.keys(tabNamesMap).map((name) => ({ name })),
              index: targetIndex, // Tab được chọn
            },
          },
        ],
      })
    );
  };

  /**
   * Reset stack và back về màn trước
   * @param navigation - Navigation object
   * @param newStack - Stack mới muốn thiết lập
   *
   * @example
   * // Đang ở C, muốn back về B1 với stack mới: A1 -> B1 -> C
   * resetStackAndGoBack(navigation, ['A1', 'B1', 'C']);
   */
  const resetStack = (
    newStack: Array<string | { name: string; params?: object }>
  ) => {
    resetStackWithParams(nav, newStack);
  };

  return {
    resetToHomeTab,
    resetStack,
  };
};
