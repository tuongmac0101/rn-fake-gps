import React, { useEffect, useRef } from "react";
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, useTheme } from "@ui-kitten/components";
import { KitText } from "~/@ui-kit";

export interface CenterModalProps {
  visible: boolean;
  header: string;
  content: string;
  onClose: () => void;
  onOpen?: () => void;
  closeButtonText?: string;
}

export const CenterModal: React.FC<CenterModalProps> = ({
  visible,
  header,
  content,
  onClose,
  onOpen,
  closeButtonText = "Đóng",
}) => {
  const theme = useTheme();
  const prevVisibleRef = useRef(visible);

  useEffect(() => {
    // Chỉ gọi onOpen khi visible chuyển từ false sang true
    if (visible && !prevVisibleRef.current && onOpen) {
      onOpen();
    }
    prevVisibleRef.current = visible;
  }, [visible, onOpen]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme["background-basic-color-1"] },
          ]}
        >
          {/* Header */}
          <KitText style={styles.header}>{header}</KitText>

          {/* Separator */}
          <View
            style={[
              styles.separator,
              { backgroundColor: theme["border-basic-color-3"] },
            ]}
          />

          {/* Content */}
          <KitText style={styles.content}>{content}</KitText>

          {/* Close Button */}
          <Button
            status="primary"
            onPress={onClose}
            style={styles.closeButton}
          >
            {closeButtonText}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "85%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    width: "100%",
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    color: "#222",
    marginBottom: 20,
    lineHeight: 22,
  },
  closeButton: {
    borderRadius: 8,
  },
});
