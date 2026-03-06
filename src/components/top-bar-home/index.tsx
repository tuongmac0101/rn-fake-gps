import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { KitText } from "~/@ui-kit";
import { KitIcon } from "~/@ui-kit/kit-icon";
import { useUserStore } from "~/stores/user.store";
import { BasicTopBar } from "../basic-top-bar";

type Props = {
  // onBellPress?: () => void
};

export const TopBarHome: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const { name, user_name } = useUserStore();
  const onBellPress = () => {};
  return (
    <BasicTopBar
      style={{
        borderRadius: 24,
        backgroundColor: theme["color-primary-900"],
      }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.userBlock}>
            <View style={styles.avatar}>
              <KitIcon name="person-outline" size={24} color="#fff" />
            </View>
            <View>
              <KitText style={styles.hello}>Xin chào,</KitText>
              <KitText style={styles.name}>{name || user_name}</KitText>
            </View>
          </View>
          <TouchableOpacity
            onPress={onBellPress}
            activeOpacity={0.9}
            style={[
              styles.bellBtn,
              { backgroundColor: theme["color-primary-500"] },
            ]}
          >
            <KitIcon name="bell-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </BasicTopBar>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userBlock: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  hello: { color: "#fff", opacity: 0.9, fontSize: 13 },
  name: { color: "#fff", fontSize: 18, fontWeight: "800" },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
