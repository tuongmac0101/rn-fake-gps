import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bookmark, Trash2 } from "lucide-react-native";
import {
  getSavedRoutes,
  removeSavedRoute,
  addHistoryEntry,
  type SavedRoute,
} from "~/services/storageService";
import { setMockLocation, isMockLocationSupported } from "~/services/mockLocationService";
import { ListEmpty } from "~/components/list-empty";
import Toast from "react-native-toast-message";

function formatCoord(lat: number, lng: number) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export function SavedRoutesScreen() {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<SavedRoute[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const list = await getSavedRoutes();
    setRoutes(list);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const onRemove = useCallback(async (id: string) => {
    await removeSavedRoute(id);
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const onApplyRoute = useCallback(
    (item: SavedRoute) => {
      const first = item.points[0];
      if (!first) return;
      if (!isMockLocationSupported) {
        Toast.show({
          type: "error",
          text1: "Không hỗ trợ",
          text2: "Mock location chỉ khả dụng trên Android.",
        });
        return;
      }
      Alert.alert(
        "Mock location",
        "Bạn có muốn mock location này không?",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Đồng ý",
            onPress: async () => {
              try {
                await setMockLocation(first);
                await addHistoryEntry({
                  mode: "Tuyến đã lưu",
                  points: item.points,
                });
                (navigation.getParent() as { navigate: (name: string) => void } | null)?.navigate(
                  "Home"
                );
                Toast.show({
                  type: "success",
                  text1: "Đã áp dụng",
                  text2: `Vị trí "${item.name}" đã được dùng làm mock.`,
                });
              } catch {
                Toast.show({
                  type: "error",
                  text1: "Không thể bật mock",
                  text2:
                    Platform.OS === "android"
                      ? "Bật 'Cho phép vị trí giả' cho app trong Cài đặt > Nhà phát triển."
                      : "Chỉ hỗ trợ trên Android.",
                });
              }
            },
          },
        ]
      );
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: SavedRoute }) => {
      const first = item.points[0];
      const coordText = first ? formatCoord(first.latitude, first.longitude) : "";
      return (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => onApplyRoute(item)}
            activeOpacity={0.7}
          >
            <Bookmark size={20} color="#3b82f6" style={styles.cardIcon} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.cardSub}>
                {item.points.length} điểm · {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </Text>
              {coordText ? (
                <Text style={styles.cardCoord} numberOfLines={1}>
                  {coordText}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onRemove(item.id)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Trash2 size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      );
    },
    [onRemove, onApplyRoute]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.header}>Đường đã lưu</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={routes.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <ListEmpty
            message="Chưa có tuyến nào. Lưu tuyến từ màn hình Bản đồ."
            minHeight={300}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  emptyList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  cardSub: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  cardCoord: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
    fontVariant: ["tabular-nums"],
  },
  deleteBtn: {
    padding: 8,
  },
});
