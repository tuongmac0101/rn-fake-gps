// LoginView.tsx
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Layout, Text, Input, Button, useTheme } from "@ui-kitten/components";
import { useLogin } from "./use-login";
import { useTranslation } from "react-i18next";
import { BasicLayout } from "~/components";
import { KitIcon, KitSpinner, KitText } from "~/@ui-kit";
import { deviceWidth } from "~/common/helpers/utils";

const SLOGAN = "Hệ sinh thái chuyển đổi số dành cho doanh nghiệp hàng đầu Việt Nam";

export const LoginView = () => {
  const { t } = useTranslation();
  const {
    email,
    password,
    showPassword,
    isLoading,
    gotoForgotPassword,
    handleLogin,
    setEmail,
    setPassword,
    setShowPassword,
  } = useLogin();

  // Right accessory icon for password visibility toggle
  const renderPasswordIcon = (props: any) => (
    <KitIcon
      {...props}
      name={showPassword ? "eye-off" : "eye"}
      onPress={() => !isLoading && setShowPassword(!showPassword)}
    />
  );

  const renderLoading = () => <KitSpinner size="small" />;

  return (
    <BasicLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <KeyboardAwareScrollView bottomOffset={62}>
          <Layout style={styles.container} level="1">
            {/* Logo & Slogan */}
            <Layout style={styles.logoContainer} level="1">
              <Image
                source={require("~/assets/icon-ape-full-no-bg.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text appearance="hint" category="s1" style={styles.slogan} numberOfLines={2}>
                {SLOGAN}
              </Text>
            </Layout>

            {/* Header */}
            <Layout style={styles.headerContainer} level="1">
              <Text category="h4" style={styles.title}>
                {t("login.title")}
              </Text>
              <Text appearance="hint" category="s1" style={styles.subtitle}>
                {t("login.subtitle")}
              </Text>
            </Layout>

            {/* Form */}
            <Layout style={styles.formContainer} level="1">
              <Text category="s1" style={styles.label}>
                {t("login.form.email.label")}
              </Text>
              <Input
                placeholder={t("login.form.email.placeholder")}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                disabled={isLoading}
                size="large"
              />

              <Text category="s1" style={styles.label}>
                {t("login.form.password.label")}
              </Text>
              <Input
                placeholder={t("login.form.password.placeholder")}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                accessoryRight={renderPasswordIcon}
                disabled={isLoading}
                size="large"
              />

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={gotoForgotPassword}
                disabled={isLoading}
              >
                <KitText
                  style={{
                    fontWeight: "bold",
                  }}
                  status="primary"
                >
                  {t("login.action.forgotPassword")}
                </KitText>
              </TouchableOpacity>
            </Layout>

            {/* Login Button */}
            <Button
              onPress={handleLogin}
              disabled={isLoading}
              accessoryLeft={isLoading ? renderLoading : undefined}
              status="primary"
              size="large"
              style={styles.loginButton}
            >
              {t("login.action.login")}
            </Button>
          </Layout>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  // Keep layout/spacing; remove hardcoded colors to let UI Kitten theme drive them
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: deviceWidth - 100,
    height: deviceWidth / 3,
  },
  slogan: {
    textAlign: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 6,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
