import React, { ReactNode } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import { KitText } from "~/@ui-kit";
import { KitIcon } from "~/@ui-kit/kit-icon";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface PopUpProps {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  showCloseIcon?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  bottomTemplate?: ReactNode;
  extraTop?: ReactNode;
  extraBottom?: ReactNode;
  children: ReactNode;
  width?: number;
  maxHeight?: number;
  closeOnBackdrop?: boolean;
}

export const CustomPopUp: React.FC<PopUpProps> = ({
  visible,
  onClose,
  title,
  showCloseIcon = true,
  onOk,
  onCancel,
  okText = "Xác nhận",
  cancelText = "Hủy",
  bottomTemplate,
  extraTop,
  extraBottom,
  children,
  width = SCREEN_WIDTH - 48,
  maxHeight = SCREEN_HEIGHT * 0.8,
  closeOnBackdrop = true,
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdrop && onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };
  const renderBottom = () => {
    if (bottomTemplate) {
      return <View style={styles.bottomTemplate}>{bottomTemplate}</View>;
    }
    if (onOk || onCancel) {
      return (
        <View style={styles.defaultButtonRow}>
          {onCancel && (
            <Button
              style={styles.cancelButton}
              appearance="outline"
              onPress={handleCancel}
            >
              {cancelText}
            </Button>
          )}
          {onOk && (
            <Button
              style={[styles.okButton, !onCancel && styles.fullWidthButton]}
              onPress={handleOk}
            >
              {okText}
            </Button>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <Layout
              style={[
                styles.container,
                {
                  width,
                  maxHeight,
                },
              ]}
              level="1"
            >
              {(title || showCloseIcon) && (
                <View style={styles.header}>
                  {title && (
                    <KitText style={styles.title} numberOfLines={1}>
                      {title}
                    </KitText>
                  )}
                  {showCloseIcon && onClose && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <KitIcon name="close-outline" size={24} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {extraTop && <View style={styles.extraTop}>{extraTop}</View>}
              <View style={styles.content}>{children}</View>
              {extraBottom && (
                <View style={styles.extraBottom}>{extraBottom}</View>
              )}
              {renderBottom()}
            </Layout>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    maxWidth: SCREEN_WIDTH - 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    flex: 1,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  extraTop: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  extraBottom: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  bottomTemplate: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  defaultButtonRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 4,
  },
  cancelButton: {
    flex: 1,
  },
  okButton: {
    flex: 1,
  },
  fullWidthButton: {
    flex: 1,
  },
});