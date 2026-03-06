import React from "react";
import {
  StyleSheet,
  ScrollView,
} from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import { KitFlatList, KitText } from "~/@ui-kit";
import { MainLayout } from "~/views/main/main-layout";
import { useTranslation } from "react-i18next";

export const ApprovalOrderTabView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainLayout showTopBarProfile={false}>
      <Layout style={styles.container} level="1">
        <ScrollView contentContainerStyle={styles.content}>
          <KitText>Approval Order</KitText>
        </ScrollView>
      </Layout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  content: { paddingBottom: 24 },
});

