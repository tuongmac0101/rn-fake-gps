import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { BasicTopBar } from "~/components";
import { KitIcon, KitText } from "~/@ui-kit";

type Props = {
  title?: string;
  onBack?: () => void;
  hideBackButton?: boolean;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const CustomTopBar: React.FC<Props> = ({
  title = "",
  onBack,
  hideBackButton = false,
  children,
  containerStyle,
}) => {
  const theme = useTheme();

  return (
    <BasicTopBar
      style={{
        borderRadius: 24,
        backgroundColor: theme["color-primary-900"],
        ...containerStyle,
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme["color-primary-900"] },
        ]}
      >
        <View style={styles.headerRow}>
          {!hideBackButton && (
            <TouchableOpacity
              onPress={onBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <KitIcon name="arrow-back-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}
    
          {title ? <KitText style={styles.title}>{title}</KitText> : null}
        </View>
        {children && <View style={styles.contentContainer}>{children}</View>}
      </View>
    </BasicTopBar>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8, 
    minHeight: 36,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    flex: 1, // Để title chiếm phần còn lại nếu cần
  },
  contentContainer: {
    marginTop: 4, // Khoảng cách giữa Title và nội dung custom
  },
});