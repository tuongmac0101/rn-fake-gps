import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Button, useTheme } from "@ui-kitten/components";
import { KitText } from "~/@ui-kit";
import { useTranslation } from "react-i18next";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface CancelOrderBottomSheetRef {
  expand: () => void;
  close: () => void;
}

interface CancelOrderBottomSheetProps {
  onConfirm: (reason: string) => void;
}

export const CancelOrderBottomSheet = forwardRef<
  CancelOrderBottomSheetRef,
  CancelOrderBottomSheetProps
>(({ onConfirm }, ref) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    expand: () => {
      setReason("");
      setVisible(true);
    },
    close: () => setVisible(false),
  }));

  const handleConfirm = () => {
    onConfirm(reason);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      style ={{ flex: 1, pointerEvents: 'box-none' }}
      onRequestClose={() => setVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.touchableBackdrop}
          onPress={() => setVisible(false)}
        />

        <View style={styles.modalContent}>
          <View style={styles.contentContainer}>
            <KitText style={styles.headerTitle}>Chọn lý do hủy đơn</KitText>

            <View style={styles.section}>
              <KitText style={styles.label}>Nhập lý do hủy đơn</KitText>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Nhập lý do..."
                multiline
                style={styles.inputBox}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button onPress={handleConfirm} style={{ flex: 1 }}>
                {t("common.action.confirm", { defaultValue: "Xác nhận" })}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  touchableBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Chiều cao khoảng 40% màn hình hoặc auto tùy nội dung
    minHeight: SCREEN_HEIGHT * 0.4,
    paddingBottom: 20,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 15,
  },
  inputBox: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E4E9F2",
    fontSize: 14,
    minHeight: 150, // Input cao hơn để nhập nhiều dòng
    backgroundColor: "#F7F9FC",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
  },
});
