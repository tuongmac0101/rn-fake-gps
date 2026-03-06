import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
export interface IKitSafeAreaLayoutProps extends SafeAreaViewProps {
  // todo
}

export const KitSafeAreaLayout = (props: IKitSafeAreaLayoutProps) => {
  return <SafeAreaView {...props} />;
};
