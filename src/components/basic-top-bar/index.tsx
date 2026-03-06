import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";

export interface IBasicTopBarProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const BasicTopBar: React.FC<IBasicTopBarProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[style]}>
      {children}
    </SafeAreaView>
  );
};
