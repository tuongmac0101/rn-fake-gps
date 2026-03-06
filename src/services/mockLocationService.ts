import { Platform } from "react-native";
import type { LatLng } from "./locationService";

let mockLocationModule: {
  setMockLocation: (args: {
    location: { latitude: number; longitude: number };
    options?: { delay?: number; accuracy?: number; altitude?: number; bearing?: number; speed?: number };
  }) => void;
  stopMockLocation: () => void;
  getError: () => string;
} | null = null;

try {
  if (Platform.OS === "android") {
    mockLocationModule = require("react-native-android-mock-location");
  }
} catch {
  mockLocationModule = null;
}

/**
 * Bật mock vị trí (chỉ Android). Cần bật "Cho phép vị trí giả" cho app trong Cài đặt nhà phát triển.
 */
export function setMockLocation(coord: LatLng): Promise<void> {
  if (Platform.OS !== "android" || !mockLocationModule) {
    return Promise.resolve();
  }
  try {
    mockLocationModule.setMockLocation({
      location: { latitude: coord.latitude, longitude: coord.longitude },
      options: { delay: 0, accuracy: 1, altitude: 3, bearing: 0, speed: 0.01 },
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * Tắt mock vị trí (chỉ Android).
 */
export function stopMockLocation(): void {
  if (Platform.OS === "android" && mockLocationModule) {
    try {
      mockLocationModule.stopMockLocation();
    } catch {}
  }
}

/**
 * Lấy thông báo lỗi từ native (nếu có).
 */
export function getMockLocationError(): string {
  if (Platform.OS === "android" && mockLocationModule) {
    try {
      return mockLocationModule.getError();
    } catch {
      return "";
    }
  }
  return "";
}

export const isMockLocationSupported = Platform.OS === "android" && !!mockLocationModule;
