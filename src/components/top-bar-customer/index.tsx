import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, useTheme } from "@ui-kitten/components";
import { BasicTopBar } from "~/components";
import { KitIcon, KitText } from "~/@ui-kit";

type Props = {
  title?: string;
  value: string;
  onChangeText: (v: string) => void;
  onBack?: () => void;
  placeholder?: string;
};

export const TopBarCustomer: React.FC<Props> = ({
  title = "Tạo đơn xuất bán",
  value,
  onChangeText,
  onBack,
  placeholder = "Tìm khách hàng",
}) => {
  const theme = useTheme();
  return (
    <BasicTopBar
      style={{
        borderRadius: 24,
        backgroundColor: theme["color-primary-900"],
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme["color-primary-900"] },
        ]}
      >
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <KitIcon name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <KitText style={styles.title}>{title}</KitText>
          <View style={{ width: 24 }} />
        </View>

        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.searchInput}
          textStyle={{ fontSize: 16 }}
          accessoryRight={() => (
            <KitIcon name="search-outline" size={20} color="#8F9BB3" />
          )}
        />
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
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  searchInput: { borderRadius: 16, backgroundColor: "#fff" },
});
