import React, { Fragment, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Layout, Popover, Text, Button, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { IKitPlacements } from "../@types";
import { KitIcon } from "../kit-icon";

export interface KitTimePickerProps {
  value?: string;
  onConfirm?: (value: string) => void;
  placement?: IKitPlacements;
  placeholder?: string;
  label?: string;
}

const convertValueToTime = (value: string) => {
  if (!value) {
    return { hour: "00", minute: "00", second: "00" };
  }
  let [hour, minute, second] = value.split(":");
  if (!hour) {
    hour = "00";
  }
  if (!minute) {
    minute = "00";
  }
  if (!second) {
    second = "00";
  }
  if (
    hour.length !== 2 ||
    minute.length !== 2 ||
    second.length !== 2 ||
    isNaN(Number(hour)) ||
    isNaN(Number(minute)) ||
    isNaN(Number(second)) ||
    Number(hour) < 0 ||
    Number(hour) > 23 ||
    Number(minute) < 0 ||
    Number(minute) > 59 ||
    Number(second) < 0 ||
    Number(second) > 59
  ) {
    return { hour: "00", minute: "00", second: "00" };
  }
  return { hour, minute, second };
};

export const KitTimePicker = ({
  value,
  onConfirm,
  placement,
  placeholder,
  label,
}: KitTimePickerProps) => {
  const theme = useTheme();
  const danger = theme["color-danger-500"];
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const time = convertValueToTime(value || "00:00:00");
  const [hour, setHour] = useState(time.hour);
  const [minute, setMinute] = useState(time.minute);
  const [second, setSecond] = useState(time.second);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const seconds = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleNow = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const s = now.getSeconds().toString().padStart(2, "0");
    setHour(h);
    setMinute(m);
    setSecond(s);
    setVisible(false);
    onConfirm?.(`${h}:${m}:${s}`);
  };

  const handleOK = () => {
    setVisible(false);
    onConfirm?.(`${hour}:${minute}:${second}`);
  };

  const handleTogglePopover = () => {
    setVisible(!visible);
  };

  const renderScrollList = (
    data: string[],
    type: "hour" | "minute" | "second"
  ) => (
    <ScrollView
      style={styles.scrollList}
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item) => {
        const isActive =
          (type === "hour" && item === hour) ||
          (type === "minute" && item === minute) ||
          (type === "second" && item === second);
        return (
          <TouchableOpacity
            key={`${type}-${item}`}
            style={[styles.itemButton, isActive && styles.activeItem]}
            onPress={() => {
              if (type === "hour") setHour(item);
              if (type === "minute") setMinute(item);
              if (type === "second") setSecond(item);
            }}
          >
            <Text style={[styles.itemText, isActive && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <Layout style={styles.container}>
      <Popover
        placement={placement}
        visible={visible}
        anchor={() => (
          <View>
            <Button
              accessoryRight={
                <KitIcon name="clock-outline" size={10} color={danger} />
              }
              onPress={handleTogglePopover} // Move state update to a handler
              style={styles.inputButton}
              appearance="outline"
            >
              {value ? value : placeholder}
            </Button>
          </View>
        )}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styles.popoverContent}>
          <View style={styles.pickerRow}>
            {renderScrollList(hours, "hour")}
            {renderScrollList(minutes, "minute")}
            {renderScrollList(seconds, "second")}
          </View>

          <View style={styles.buttonContainer}>
            <Button appearance="outline" onPress={handleNow}>
              {t("Now")}
            </Button>
            <Button onPress={handleOK}>{t("Ok")}</Button>
          </View>
        </Layout>
      </Popover>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 1, flex: 1 },
  inputButton: { marginBottom: 16, paddingVertical: 8, textAlign: "center" },
  popoverContent: { padding: 16 },
  pickerRow: { flexDirection: "row", alignItems: "center" },
  scrollList: { height: 200, width: 70, marginHorizontal: 2 },
  itemButton: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    borderRadius: 6,
  },
  itemText: { fontSize: 16 },
  activeItem: {
    backgroundColor: "#3366FF22",
  },
  activeText: {
    color: "#3366FF",
    fontWeight: "bold",
  },
  separator: { fontSize: 18, marginHorizontal: 4 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: { flex: 1, marginHorizontal: 4 },
  timeText: { marginTop: 16, textAlign: "center" },
});
