import React from "react";
import { StyleSheet, View } from "react-native";
import { KitSpinner, KitText } from "~/@ui-kit";
import { useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export const ListFooter = ({ loadingMessage }: { loadingMessage?: string }) => {
  const theme = useTheme();
  const textSubtle = theme["text-hint-color"];
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <KitSpinner size="small" />
      <KitText style={[styles.footerText, { color: textSubtle }]}>
        {loadingMessage || t("common.label.loadingMore")}
      </KitText>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 13,
  },
});
