import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { MapPin, Route, Shuffle, Save, Bookmark } from "lucide-react-native";
import type { SimulateMode } from "~/services/locationService";

const MODES: { key: SimulateMode; label: string; Icon: typeof MapPin }[] = [
  { key: "teleport", label: "Tap to Teleport", Icon: MapPin },
  { key: "route", label: "Simulate A→B", Icon: Route },
  { key: "randomWalk", label: "Random Walk", Icon: Shuffle },
];

export interface ControlPanelProps {
  mode: SimulateMode;
  speedKmh: number;
  loopEnabled: boolean;
  onModeChange: (mode: SimulateMode) => void;
  onSpeedChange: (speed: number) => void;
  onLoopChange: (enabled: boolean) => void;
  onSaveRoute: () => void;
  onGoToBookmarks: () => void;
}

export function ControlPanel({
  mode,
  speedKmh,
  loopEnabled,
  onModeChange,
  onSpeedChange,
  onLoopChange,
  onSaveRoute,
  onGoToBookmarks,
}: ControlPanelProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionLabel}>Chế độ</Text>
      <View style={styles.modeRow}>
        {MODES.map(({ key, label, Icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.modeBtn, mode === key && styles.modeBtnActive]}
            onPress={() => onModeChange(key)}
            activeOpacity={0.8}
          >
            <Icon
              size={18}
              color={mode === key ? "#fff" : "#64748b"}
              style={styles.modeIcon}
            />
            <Text
              style={[styles.modeLabel, mode === key && styles.modeLabelActive]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Tốc độ: {speedKmh} km/h</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={120}
        step={1}
        value={speedKmh}
        onValueChange={onSpeedChange}
        minimumTrackTintColor="#3b82f6"
        maximumTrackTintColor="#e2e8f0"
        thumbTintColor="#3b82f6"
      />

      {mode === "route" && (
        <View style={styles.loopRow}>
          <Text style={styles.loopLabel}>Lặp A–B</Text>
          <Switch
            value={loopEnabled}
            onValueChange={onLoopChange}
            trackColor={{ false: "#cbd5e0", true: "#93c5fd" }}
            thumbColor="#fff"
          />
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={onSaveRoute}
          activeOpacity={0.8}
        >
          <Save size={20} color="#3b82f6" />
          <Text style={styles.btnSecondaryText}>Lưu tuyến hiện tại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={onGoToBookmarks}
          activeOpacity={0.8}
        >
          <Bookmark size={20} color="#fff" />
          <Text style={styles.btnPrimaryText}>Đến Bookmark</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  modeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
  },
  modeBtnActive: {
    backgroundColor: "#3b82f6",
  },
  modeIcon: {
    marginRight: 6,
  },
  modeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
  },
  modeLabelActive: {
    color: "#fff",
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  loopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 20,
  },
  loopLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
  actions: {
    gap: 12,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    gap: 10,
  },
  btnSecondary: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  btnPrimary: {
    backgroundColor: "#3b82f6",
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3b82f6",
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
