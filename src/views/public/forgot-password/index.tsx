// ForgotPasswordView.tsx
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout, Input, Button } from "@ui-kitten/components";
import { BasicLayout } from "~/components";
import { KitText } from "~/@ui-kit";
import { useTranslation } from "react-i18next";

export const ForgotPasswordView = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const navigation = useNavigation<any>();

  const handleNext = () => {
    navigation.navigate("VerifyCodeView", { email });
  };

  return (
    <BasicLayout>
      <Layout style={styles.container} level="1">
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <KitText status="primary">{t("common.action.back")}</KitText>
        </TouchableOpacity>

        {/* Header */}
        <Layout style={styles.headerContainer} level="1">
          <KitText category="h4" style={styles.title}>
            {t("forgot_password.title")}
          </KitText>
          <KitText appearance="hint" category="s1" style={styles.subtitle}>
            {t("forgot_password.subtitle")}
          </KitText>
        </Layout>

        {/* Email Input */}
        <Layout style={styles.formContainer} level="1">
          <KitText category="s1" style={styles.label}>
            {t("forgot_password.form.email.label")}
          </KitText>
          <Input
            placeholder={t("forgot_password.form.email.placeholder")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            size="large"
          />
        </Layout>

        {/* Next Button */}
        <Button
          status="primary"
          size="large"
          style={styles.nextButton}
          onPress={handleNext}
        >
          <KitText>{t("common.action.next")}</KitText>
        </Button>
      </Layout>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
  },
  nextButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto", // push to bottom
  },
});
