import { Layout } from "@ui-kitten/components";
import { AuthGuard } from "./@guards";
import { TopBarHome } from "~/components/top-bar-home";
import { StyleSheet } from "react-native";
import React from "react";

export interface IMainLayoutProps {
  children: React.ReactNode;
  showTopBarProfile?: boolean;
}

export const MainLayout = ({
  children,
  showTopBarProfile = false,
}: IMainLayoutProps) => {
  const topBar = showTopBarProfile ? <TopBarHome /> : null;
  return (
    <AuthGuard>
      <Layout style={styles.layout}>
        {topBar}
        {children}
      </Layout>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  layout: { flex: 1 },
});
