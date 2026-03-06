// ResetPasswordView.tsx
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  Text,
  Input,
  Button,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { BasicLayout } from "~/components"; // chỉnh path cho đúng
import { t } from "i18next";
import { useTranslation } from "react-i18next";

/** Shared password input with eye toggle (UI Kitten) */
const PasswordField = ({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const EyeIcon = (props: any) => (
    <Icon {...props} name={show ? "eye-off" : "eye"} />
  );

  return (
    <Layout style={styles.inputContainer} level="1">
      <Text category="s1" style={styles.label}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!show}
        accessoryRight={(props) => (
          <TouchableOpacity
            onPress={() => setShow(!show)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <EyeIcon {...props} />
          </TouchableOpacity>
        )}
        size="large"
      />
    </Layout>
  );
};

export const ResetPasswordView = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleComplete = () => {
    Keyboard.dismiss();
    if (newPassword.length < 8 || newPassword.length > 16) {
      // có thể thay bằng toast/snackbar nếu bạn có
      alert("Mật khẩu phải dài từ 8 đến 16 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
    // TODO: call API update password
    // navigation.navigate("Login");
  };

  return (
    <BasicLayout>
      <Layout style={styles.container} level="1">
        {/* Back button (text) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={t("common.action.back")}
        >
          <Text style={{ color: theme["color-primary-default"], fontSize: 16 }}>
            {t("common.action.back")}
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <Layout style={styles.headerContainer} level="1">
          <Text category="h4" style={styles.title}>
            {t("reset_password.title")}
          </Text>
          <Text appearance="hint" category="s1" style={styles.subtitle}>
            {t("reset_password.subtitle")}
          </Text>
        </Layout>

        {/* Form */}
        <Layout style={styles.formContainer} level="1">
          <PasswordField
            label={t("reset_password.form.newPassword.label")}
            placeholder={t("reset_password.form.newPassword.placeholder")}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <PasswordField
            label={t("reset_password.form.confirmPassword.label")}
            placeholder={t("reset_password.form.confirmPassword.placeholder")}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </Layout>

        {/* Complete */}
        <Button
          status="primary"
          size="large"
          style={styles.completeButton}
          onPress={handleComplete}
          disabled={!newPassword || !confirmPassword}
        >
          {t("common.action.complete")}
        </Button>
      </Layout>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  // giữ layout/spacing, bỏ toàn bộ màu cứng để theme quyết định
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    justifyContent: "flex-start",
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
  },
  completeButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
});
