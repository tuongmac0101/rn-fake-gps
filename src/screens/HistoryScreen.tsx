import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { History } from "lucide-react-native";
import { getHistory, type HistoryEntry } from "~/services/storageService";
import { ListEmpty } from "~/components/list-empty";

function formatCoord(lat: number, lng: number) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export function HistoryScreen() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const list = await getHistory();
    setEntries(list);
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

  const renderItem = useCallback(({ item }: { item: HistoryEntry }) => {
    const first = item.points[0];
    const coordText = first ? formatCoord(first.latitude, first.longitude) : "";
    return (
      <View style={styles.card}>
        <History size={20} color="#64748b" style={styles.cardIcon} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.mode}</Text>
          <Text style={styles.cardSub}>
            {item.points.length} điểm · {new Date(item.createdAt).toLocaleString("vi-VN")}
          </Text>
          {coordText ? (
            <Text style={styles.cardCoord} numberOfLines={1}>
              {coordText}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.header}>Lịch sử</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={entries.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <ListEmpty
            message="Chưa có lịch sử. Lịch sử ghi nhận khi bạn bấm Sử dụng vị trí này và Kết nối mock location."
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
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
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
});
