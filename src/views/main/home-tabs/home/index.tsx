import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Card, useTheme, Layout } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { MainLayout } from "~/views/main/main-layout";

export const HomeTabView = () => {
  const { t } = useTranslation();
  const theme = useTheme();


  return (
    <MainLayout showTopBarProfile>
      {/* Body */}
      <Layout style={styles.container} level="1">
        <ScrollView contentContainerStyle={styles.content}>

        </ScrollView>
      </Layout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  // Body
  container: { flex: 1, paddingHorizontal: 16 },
  content: { paddingBottom: 24 },

});
