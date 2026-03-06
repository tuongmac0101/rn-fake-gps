import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  SAVED_ROUTES: "@fake_gps/saved_routes",
  HISTORY: "@fake_gps/history",
} as const;

export interface SavedRoute {
  id: string;
  name: string;
  points: Array<{ latitude: number; longitude: number }>;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  mode: string;
  points: Array<{ latitude: number; longitude: number }>;
  createdAt: string;
}

export async function getSavedRoutes(): Promise<SavedRoute[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SAVED_ROUTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRoute(route: Omit<SavedRoute, "id" | "createdAt">): Promise<SavedRoute> {
  const list = await getSavedRoutes();
  const item: SavedRoute = {
    ...route,
    id: `route_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  list.unshift(item);
  await AsyncStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(list));
  return item;
}

export async function removeSavedRoute(id: string): Promise<void> {
  const list = await getSavedRoutes();
  const next = list.filter((r) => r.id !== id);
  await AsyncStorage.setItem(KEYS.SAVED_ROUTES, JSON.stringify(next));
}

export async function getHistory(): Promise<HistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addHistoryEntry(
  entry: Omit<HistoryEntry, "id" | "createdAt">
): Promise<HistoryEntry> {
  const list = await getHistory();
  const item: HistoryEntry = {
    ...entry,
    id: `hist_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  list.unshift(item);
  const trimmed = list.slice(0, 100);
  await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(trimmed));
  return item;
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify([]));
}
