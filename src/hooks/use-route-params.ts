import { useRoute } from "@react-navigation/native";

export const useRouteParams = <T = any>() => {
  const route = useRoute<any>();
  return route.params as T;
};
