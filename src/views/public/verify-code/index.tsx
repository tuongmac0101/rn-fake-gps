// VerifyCodeView.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Layout, Text, Input, Button, useTheme } from "@ui-kitten/components";
import { BasicLayout } from "~/components"; // chỉnh path cho đúng
import { useTranslation } from "react-i18next";

const CODE_LENGTH = 6;
const RESEND_TIMER = 30;

export const VerifyCodeView = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email as string | undefined;

  const [code, setCode] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => "")
  );
  const [timer, setTimer] = useState(RESEND_TIMER);
  const inputRefs = useRef<Array<Input | null>>([]);

  // countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    const value = text.slice(-1); // only keep last char
    const next = [...code];
    next[index] = value;
    setCode(next);

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const entered = code.join("");
    if (entered.length === CODE_LENGTH) {
      Keyboard.dismiss();
      navigation.navigate("ResetPasswordView", { email });
    } else {
      // bạn có thể thay bằng toast
      // Alert.alert("Thông báo", "Vui lòng nhập đủ 6 chữ số.");
    }
  };

  const handleResendCode = () => {
    setTimer(RESEND_TIMER);
    // call API resend here
  };

  const isFilled = (i: number) => Boolean(code[i]);

  return (
    <BasicLayout>
      <Layout style={styles.container} level="1">
        {/* Back Button (text) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={t("common.action.back")}
        >
          <Text style={{ color: theme["color-primary-default"] }}>
            {t("common.action.back")}
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <Layout style={styles.headerContainer} level="1">
          <Text category="h4" style={styles.title}>
            {t("verify_code.title")}
          </Text>
          <Text appearance="hint" category="s1" style={styles.subtitle}>
            {t("verify_code.subtitle1")}{" "}
            <Text category="s1" style={{ fontWeight: "700" }}>
              {email || ""}
            </Text>{" "}
            {t("verify_code.subtitle2")}
          </Text>
        </Layout>

        {/* Code Inputs */}
        <Layout style={styles.inputContainer} level="1">
          {code.map((digit, index) => (
            <Input
              key={index}
              style={[
                styles.input,
                // viền theo status UI Kitten thay vì màu cứng
                // (primary khi đã nhập, basic khi trống)
              ]}
              status={isFilled(index) ? "primary" : "basic"}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              size="large"
              ref={(el: any) => (inputRefs.current[index] = el)}
              textStyle={styles.inputText}
            />
          ))}
        </Layout>

        {/* Verify Button */}
        <Button
          status="primary"
          size="large"
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={code.join("").length !== CODE_LENGTH}
        >
          {t("common.action.verify")}
        </Button>

        {/* Resend */}
        <Layout style={styles.resendContainer} level="1">
          <Text appearance="hint" category="c1" style={styles.resendText}>
            {t("verify_code.resendCodeByTime", {
              time: String(timer).padStart(2, "0"),
            })}
          </Text>
          <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
            <Text
              style={[
                styles.resendLink,
                { color: timer > 0 ? "gray" : theme["color-primary-default"] },
              ]}
            >
              {timer > 0 ? "" : t("verify_code.resendCode")}
            </Text>
          </TouchableOpacity>
        </Layout>
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  input: {
    width: 50,
    // height is handled by size="large"; keep ratio via padding if muốn
  },
  inputText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },
  verifyButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resendText: {
    // color controlled by appearance="hint"
    marginBottom: 4,
  },
  resendLink: {
    fontWeight: "bold",
  },
});
