import React from "react";
import { Layout, LayoutProps } from "@ui-kitten/components";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Edge } from "react-native-safe-area-context";
import { KitSafeAreaLayout } from "~/@ui-kit";

export interface IBasicLayoutProps extends LayoutProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  safeAreaStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
}

export const BasicLayout = ({ children, ...props }: IBasicLayoutProps) => {
  const { useSafeArea = true, safeAreaStyle, edges, ...restProps } = props;
  return (
    <Layout style={[styles.layout, props.style]} {...restProps}>
      {useSafeArea ? (
        <KitSafeAreaLayout
          style={[styles.safeArea, safeAreaStyle]}
          edges={edges}
        >
          {children}
        </KitSafeAreaLayout>
      ) : (
        children
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: { flex: 1 },
  safeArea: { flex: 1 },
});
