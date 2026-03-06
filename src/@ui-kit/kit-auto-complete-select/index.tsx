import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {
  Layout,
  Popover,
  Input,
  List,
  ListItem,
  Spinner,
} from "@ui-kitten/components";
import { KitIcon, KitText } from "~/@ui-kit";

export interface KitAutoCompleteSelectProps<T> {
  data: T[];
  selectedItem: T | null;
  onSelectItem: (item: T) => void;
  getLabel: (item: T) => string;
  placeholder?: string;
  maxResults?: number;
  loadStep?: number;
  listHeight?: number;
  filterFn?: (item: T, query: string) => boolean;
}

export function KitAutoCompleteSelect<T>({
  data = [],
  selectedItem,
  onSelectItem,
  getLabel,
  placeholder = "Chọn giá trị",
  maxResults = 50,
  loadStep = 50,
  listHeight = 300,
  filterFn,
}: KitAutoCompleteSelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(maxResults);
  const [loadingMore, setLoadingMore] = useState(false);
  const inputRef = useRef<Input>(null);

  const displayValue = selectedItem ? getLabel(selectedItem) : "";

  // 🔎 Remove accents for accent-insensitive search
  const removeDiacritics = useCallback((str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }, []);

  // Focus input after popover is visible
  useEffect(() => {
    if (visible && inputRef.current) {
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [visible]);

  // Filter data (ILIKE + ignore accents)
  const filtered = useMemo(() => {
    if (!data) return [];
    const q = removeDiacritics(query.trim());
    const filteredList = q
      ? data.filter((item) => {
          const label = removeDiacritics(getLabel(item));
          return filterFn ? filterFn(item, q) : label.includes(q);
        })
      : data;
    return filteredList;
  }, [data, query, getLabel, filterFn, removeDiacritics]);

  const visibleData = useMemo(
    () => filtered.slice(0, limit),
    [filtered, limit]
  );

  const handlePick = useCallback(
    (item: T) => {
      onSelectItem(item);
      setVisible(false);
      setQuery("");
      setLimit(maxResults);
    },
    [onSelectItem, maxResults]
  );

  const handleEndReached = useCallback(() => {
    if (visibleData.length < filtered.length && !loadingMore) {
      setLoadingMore(true);
      setLimit((prev) => prev + loadStep);
      setLoadingMore(false);
    }
  }, [visibleData.length, filtered.length, loadingMore, loadStep]);

  const handleToggleVisible = useCallback(() => {
    setVisible((v) => !v);
    setLimit(maxResults);
  }, [maxResults]);

  const handleChangeText = useCallback(
    (text: string) => {
      setQuery(text);
      setLimit(maxResults);
    },
    [maxResults]
  );

  const renderAnchor = useCallback(
    () => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleToggleVisible}
        style={styles.selectLike}
      >
        <KitText
          numberOfLines={1}
          appearance={displayValue ? "default" : "hint"}
          style={styles.selectText}
        >
          {displayValue || placeholder}
        </KitText>
        <KitIcon
          name={visible ? "arrow-up-outline" : "arrow-down-outline"}
          style={styles.icon}
        />
      </TouchableOpacity>
    ),
    [displayValue, visible, placeholder, handleToggleVisible]
  );

  return (
    <Layout style={styles.wrapper}>
      <Popover
        visible={visible}
        anchor={renderAnchor}
        onBackdropPress={() => setVisible(false)}
        placement="bottom start"
        fullWidth
      >
        <Layout style={[styles.dropdown, { maxHeight: listHeight + 60 }]}>
          <Input
            ref={inputRef}
            placeholder="Tìm kiếm..."
            value={query}
            onChangeText={handleChangeText}
            size="small"
            style={styles.search}
            accessoryLeft={<KitIcon name="search-outline" />}
          />
          <List
            data={visibleData}
            keyExtractor={(item) => getLabel(item)}
            keyboardShouldPersistTaps="handled"
            style={[styles.list, { maxHeight: listHeight }]}
            renderItem={({ item }) => (
              <ListItem
                title={getLabel(item)}
                onPress={() => handlePick(item)}
              />
            )}
            ListEmptyComponent={() => (
              <Layout style={styles.emptyBox}>
                <KitText appearance="hint">
                  {data.length === 0
                    ? "Danh sách rỗng"
                    : "Không tìm thấy kết quả"}
                </KitText>
              </Layout>
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loadingMore ? (
                <Layout style={styles.loadingBox}>
                  <Spinner size="small" />
                </Layout>
              ) : null
            }
          />
        </Layout>
      </Popover>
    </Layout>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "stretch",
  },
  selectLike: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E4E9F2",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F7F9FC",
    width: "100%",
  },
  selectText: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  dropdown: {
    padding: 8,
    borderRadius: 8,
    maxHeight: windowHeight * 0.5,
  },
  search: {
    marginBottom: 8,
  },
  list: {
    maxHeight: windowHeight * 0.4,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 16,
  },
  loadingBox: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
