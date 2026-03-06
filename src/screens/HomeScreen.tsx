import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { type MarkerType } from "~/components/map-view";
import { SearchBar } from "~/components/search-bar";
import { ControlPanel } from "~/components/control-panel";
import type { LatLng, SimulateMode } from "~/services/locationService";
import { SlidersHorizontal, X } from "lucide-react-native";
import { saveRoute, addHistoryEntry } from "~/services/storageService";
import { setMockLocation, isMockLocationSupported } from "~/services/mockLocationService";
import Toast from "react-native-toast-message";

export function HomeScreen() {
  const navigation = useNavigation();
  const [showControlModal, setShowControlModal] = useState(false);
  const [mode, setMode] = useState<SimulateMode>("teleport");
  const [speedKmh, setSpeedKmh] = useState(30);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [pointA, setPointA] = useState<LatLng | null>(null);
  const [pointB, setPointB] = useState<LatLng | null>(null);
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);
  const [routePoints, setRoutePoints] = useState<LatLng[]>([]);
  const [pendingMapCoord, setPendingMapCoord] = useState<LatLng | null>(null);
  const [showLocationChoiceModal, setShowLocationChoiceModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [markerOptionCoord, setMarkerOptionCoord] = useState<LatLng | null>(null);
  const [markerOptionType, setMarkerOptionType] = useState<MarkerType | null>(null);
  const [showMarkerOptionModal, setShowMarkerOptionModal] = useState(false);

  const onPlaceSelect = useCallback((lat: number, lng: number, _description?: string) => {
    const coord = { latitude: lat, longitude: lng };
    setCurrentPosition(coord);
    if (mode === "teleport") {
      setCurrentPosition(coord);
    } else if (mode === "route") {
      if (!pointA) setPointA(coord);
      else setPointB(coord);
    }
  }, [mode, pointA]);

  const onMapPress = useCallback(
    (e: { nativeEvent: { coordinate: LatLng } }) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setPendingMapCoord({ latitude, longitude });
      setShowLocationChoiceModal(true);
    },
    []
  );

  const pointsToSave =
    routePoints.length >= 2 ? routePoints : pointA && pointB ? [pointA, pointB] : [];

  const handleSaveRoute = useCallback(async () => {
    if (pointsToSave.length < 2) {
      Toast.show({
        type: "info",
        text1: "Chưa đủ điểm",
        text2: "Chọn ít nhất 2 điểm (A và B) hoặc tuyến đường để lưu.",
      });
      return;
    }
    try {
      await saveRoute({
        name: `Tuyến ${new Date().toLocaleString("vi-VN")}`,
        points: pointsToSave,
      });
      Toast.show({
        type: "success",
        text1: "Đã lưu",
        text2: "Tuyến đường đã được thêm vào Bookmark.",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể lưu tuyến đường.",
      });
    }
  }, [pointsToSave]);

  const handleGoToBookmarks = useCallback(() => {
    (navigation.getParent() as { navigate: (name: string) => void } | null)?.navigate(
      "SavedRoutes"
    );
  }, [navigation]);

  const handleUseLocation = useCallback(() => {
    setShowLocationChoiceModal(false);
    setShowConnectModal(true);
  }, []);

  const handleDeclineLocation = useCallback(() => {
    setShowLocationChoiceModal(false);
    setPendingMapCoord(null);
  }, []);

  const handleSetPointA = useCallback(() => {
    if (pendingMapCoord) {
      setPointA(pendingMapCoord);
      setShowLocationChoiceModal(false);
      setPendingMapCoord(null);
      Toast.show({ type: "success", text1: "Điểm A", text2: "Đã đặt điểm xuất phát." });
    }
  }, [pendingMapCoord]);

  const handleSetPointB = useCallback(() => {
    if (pendingMapCoord) {
      setPointB(pendingMapCoord);
      setShowLocationChoiceModal(false);
      setPendingMapCoord(null);
      Toast.show({ type: "success", text1: "Điểm B", text2: "Đã đặt điểm đến." });
    }
  }, [pendingMapCoord]);

  const handleConnectMock = useCallback(async () => {
    if (!pendingMapCoord) return;
    setConnectLoading(true);
    try {
      await setMockLocation(pendingMapCoord);
      setCurrentPosition(pendingMapCoord);
      await addHistoryEntry({
        mode: "Mock location",
        points: [pendingMapCoord],
      });
      setShowConnectModal(false);
      setPendingMapCoord(null);
      Toast.show({
        type: "success",
        text1: "Đã kết nối",
        text2: "Vị trí mock đã được áp dụng.",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Không thể bật mock",
        text2:
          Platform.OS === "android"
            ? "Bật 'Cho phép vị trí giả' cho app trong Cài đặt > Nhà phát triển."
            : "Chỉ hỗ trợ trên Android.",
      });
    } finally {
      setConnectLoading(false);
    }
  }, [pendingMapCoord]);

  const handleCloseConnect = useCallback(() => {
    setShowConnectModal(false);
    setPendingMapCoord(null);
  }, []);

  const handleMarkerPress = useCallback((coordinate: LatLng, type: MarkerType) => {
    setMarkerOptionCoord(coordinate);
    setMarkerOptionType(type);
    setShowMarkerOptionModal(true);
  }, []);

  const handleCloseMarkerOption = useCallback(() => {
    setShowMarkerOptionModal(false);
    setMarkerOptionCoord(null);
    setMarkerOptionType(null);
  }, []);

  const getMarkerLabel = useCallback((t: MarkerType) => {
    if (t === "A") return "Điểm A";
    if (t === "B") return "Điểm B";
    return "Vị trí hiện tại";
  }, []);

  const handleSaveMarkerLocation = useCallback(async () => {
    if (!markerOptionCoord || !markerOptionType) return;
    const label = getMarkerLabel(markerOptionType);
    const points = [markerOptionCoord];
    try {
      await saveRoute({
        name: `${label} - ${new Date().toLocaleDateString("vi-VN")}`,
        points,
      });
      handleCloseMarkerOption();
      Toast.show({
        type: "success",
        text1: "Đã lưu",
        text2: "Vị trí đã thêm vào Đã lưu.",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể lưu vị trí.",
      });
    }
  }, [markerOptionCoord, markerOptionType, getMarkerLabel, handleCloseMarkerOption]);

  const handleClearMarkerData = useCallback(() => {
    if (!markerOptionType) return;
    if (markerOptionType === "A") setPointA(null);
    else if (markerOptionType === "B") setPointB(null);
    else setCurrentPosition(null);
    handleCloseMarkerOption();
    Toast.show({
      type: "success",
      text1: "Đã xóa",
      text2: markerOptionType === "A" ? "Đã xóa Điểm A." : markerOptionType === "B" ? "Đã xóa Điểm B." : "Đã xóa vị trí hiện tại.",
    });
  }, [markerOptionType, handleCloseMarkerOption]);

  const formatCoord = useCallback((c: LatLng | null) => {
    if (!c) return "—";
    return `${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}`;
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        currentPosition={currentPosition}
        pointA={pointA}
        pointB={pointB}
        routePoints={routePoints}
        onPress={onMapPress}
        onMarkerPress={handleMarkerPress}
      />
      <View style={styles.searchOverlay} pointerEvents="box-none">
        <SearchBar onPlaceSelect={onPlaceSelect} />
      </View>

      <View style={styles.locationInfoPanel} pointerEvents="none">
        <Text style={styles.locationInfoTitle}>Vị trí</Text>
        <View style={styles.locationInfoRow}>
          <Text style={[styles.locationInfoLabel, styles.locationInfoLabelCurrent]}>
            Hiện tại
          </Text>
          <Text style={styles.locationInfoValue} numberOfLines={1}>
            {formatCoord(currentPosition)}
          </Text>
        </View>
        <View style={styles.locationInfoRow}>
          <Text style={[styles.locationInfoLabel, styles.locationInfoLabelA]}>Điểm A</Text>
          <Text style={styles.locationInfoValue} numberOfLines={1}>
            {formatCoord(pointA)}
          </Text>
        </View>
        <View style={styles.locationInfoRow}>
          <Text style={[styles.locationInfoLabel, styles.locationInfoLabelB]}>Điểm B</Text>
          <Text style={styles.locationInfoValue} numberOfLines={1}>
            {formatCoord(pointB)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowControlModal(true)}
        activeOpacity={0.9}
      >
        <SlidersHorizontal size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={showControlModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowControlModal(false)}
        statusBarTranslucent
      >
        <View style={styles.controlModalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowControlModal(false)}
          />
          <View style={styles.controlModalContent}>
            <View style={styles.controlModalHeader}>
              <Text style={styles.controlModalTitle}>Điều khiển</Text>
              <TouchableOpacity
                style={styles.controlModalCloseBtn}
                onPress={() => setShowControlModal(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            <ControlPanel
              mode={mode}
              speedKmh={speedKmh}
              loopEnabled={loopEnabled}
              onModeChange={setMode}
              onSpeedChange={setSpeedKmh}
              onLoopChange={setLoopEnabled}
              onSaveRoute={handleSaveRoute}
              onGoToBookmarks={handleGoToBookmarks}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showMarkerOptionModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseMarkerOption}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCloseMarkerOption}
          />
          <View style={styles.choiceCard}>
            <Text style={styles.choiceTitle}>
              {markerOptionType ? getMarkerLabel(markerOptionType) : "Vị trí"}
            </Text>
            <Text style={styles.choiceSub}>
              Lưu vị trí này vào Đã lưu hoặc xóa dữ liệu điểm này.
            </Text>
            <TouchableOpacity
              style={[styles.choiceBtn, styles.choiceBtnClear]}
              onPress={handleClearMarkerData}
              activeOpacity={0.8}
            >
              <Text style={styles.choiceBtnClearText}>Xóa dữ liệu</Text>
            </TouchableOpacity>
            <View style={styles.choiceButtons}>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.choiceBtnSecondary]}
                onPress={handleCloseMarkerOption}
                activeOpacity={0.8}
              >
                <Text style={styles.choiceBtnSecondaryText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.choiceBtnPrimary]}
                onPress={handleSaveMarkerLocation}
                activeOpacity={0.8}
              >
                <Text style={styles.choiceBtnPrimaryText}>Lưu vị trí này</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLocationChoiceModal}
        transparent
        animationType="fade"
        onRequestClose={handleDeclineLocation}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleDeclineLocation}
          />
          <View style={styles.choiceCard}>
            <Text style={styles.choiceTitle}>
              {mode === "route" ? "Chọn tác vụ với vị trí này" : "Sử dụng vị trí này?"}
            </Text>
            <Text style={styles.choiceSub}>
              {mode === "route"
                ? "Đặt làm Điểm A/B để mô phỏng tuyến, hoặc dùng làm mock location."
                : "Vị trí bạn chọn sẽ dùng làm vị trí mock (chỉ Android)."}
            </Text>
            {mode === "route" ? (
              <View style={styles.choiceButtonsColumn}>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnPoint]}
                  onPress={handleSetPointA}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnPrimaryText}>Đặt làm Điểm A</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnPoint]}
                  onPress={handleSetPointB}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnPrimaryText}>Đặt làm Điểm B</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnPrimary]}
                  onPress={handleUseLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnPrimaryText}>Dùng làm Mock</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnSecondary]}
                  onPress={handleDeclineLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnSecondaryText}>Từ chối</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.choiceButtons}>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnSecondary]}
                  onPress={handleDeclineLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnSecondaryText}>Từ chối</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.choiceBtnPrimary]}
                  onPress={handleUseLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.choiceBtnPrimaryText}>Sử dụng vị trí này</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showConnectModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseConnect}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCloseConnect}
          />
          <View style={styles.connectCard}>
            <Text style={styles.connectTitle}>Kết nối Mock Location</Text>
            {isMockLocationSupported ? (
              <>
                <Text style={styles.connectBody}>
                  Trên Android: vào Cài đặt → Hệ thống → Tùy chọn nhà phát triển → Chọn ứng dụng
                  giả lập vị trí → chọn ứng dụng này.
                </Text>
                <Text style={styles.connectHint}>
                  Hoặc bật "Cho phép vị trí giả" và chọn app này làm app mock.
                </Text>
              </>
            ) : (
              <Text style={styles.connectBody}>
                Tính năng mock vị trí chỉ khả dụng trên Android. Trên iOS vui lòng dùng chế độ
                Teleport để hiển thị vị trí trên bản đồ.
              </Text>
            )}
            <View style={styles.connectButtons}>
              <TouchableOpacity
                style={[styles.connectBtn, styles.connectBtnCancel]}
                onPress={handleCloseConnect}
                activeOpacity={0.8}
                disabled={connectLoading}
              >
                <Text style={styles.connectBtnCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.connectBtn, styles.connectBtnConfirm]}
                onPress={handleConnectMock}
                activeOpacity={0.8}
                disabled={connectLoading || !isMockLocationSupported}
              >
                {connectLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.connectBtnConfirmText}>Kết nối</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  locationInfoPanel: {
    position: "absolute",
    top: 130,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  locationInfoTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  locationInfoLabel: {
    fontSize: 13,
    fontWeight: "600",
    width: 72,
  },
  locationInfoLabelCurrent: { color: "#3b82f6" },
  locationInfoLabelA: { color: "#22c55e" },
  locationInfoLabelB: { color: "#ef4444" },
  locationInfoValue: {
    fontSize: 12,
    color: "#475569",
    flex: 1,
    marginLeft: 8,
    textAlign: "right",
    fontVariant: ["tabular-nums"],
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 12,
    zIndex: 1000,
  },
  controlModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  controlModalContent: {
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    height: "50%",
  },
  controlModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  controlModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  controlModalCloseBtn: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  choiceCard: {
    width: "85%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  choiceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  choiceSub: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
    lineHeight: 20,
  },
  choiceButtons: {
    flexDirection: "row",
    gap: 12,
  },
  choiceButtonsColumn: {
    gap: 10,
  },
  choiceBtnPoint: {
    backgroundColor: "#22c55e",
  },
  choiceBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceBtnSecondary: {
    backgroundColor: "#f1f5f9",
  },
  choiceBtnPrimary: {
    backgroundColor: "#3b82f6",
  },
  choiceBtnSecondaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },
  choiceBtnPrimaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  choiceBtnClear: {
    flex: undefined,
    alignSelf: "stretch",
    backgroundColor: "#fef2f2",
    marginBottom: 8,
  },
  choiceBtnClearText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#dc2626",
  },
  connectCard: {
    width: "85%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  connectTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  connectBody: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 22,
    marginBottom: 8,
  },
  connectHint: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 20,
  },
  connectButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  connectBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  connectBtnCancel: {
    backgroundColor: "#f1f5f9",
  },
  connectBtnConfirm: {
    backgroundColor: "#3b82f6",
  },
  connectBtnCancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },
  connectBtnConfirmText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
