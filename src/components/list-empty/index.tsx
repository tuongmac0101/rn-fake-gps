import React from "react";
import { StyleSheet, View } from "react-native";
import { KitIcon, KitSpinner, KitText } from "~/@ui-kit";
import { useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export const ListEmpty = ({
  message,
  minHeight,
}: {
  message?: string;
  minHeight?: number;
}) => {
  const theme = useTheme();
  const textSubtle = theme["text-hint-color"];
  const { t } = useTranslation();
  return (
    <View style={[styles.centered, minHeight ? { minHeight } : undefined]}>
      <KitIcon name="credit-card-outline" size={24} />
      <KitText style={[styles.emptyText, { color: textSubtle }]}>
        {message || t("common.label.noData")}
      </KitText>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
});
