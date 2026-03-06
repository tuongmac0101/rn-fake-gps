import {
  getDistance,
  getGreatCircleBearing,
  computeDestinationPoint,
} from "geolib";
import { useRef, useCallback, useEffect, useState } from "react";
import {
  kmhToMps,
  distanceInMeters,
  randomCoordinateInRadius,
} from "~/utils/helpers";

export type SimulateMode = "teleport" | "route" | "randomWalk";

export interface LatLng {
  latitude: number;
  longitude: number;
}

/** Chuẩn hóa sang format geolib { latitude, longitude } */
function toGeolibCoord(c: LatLng): { latitude: number; longitude: number } {
  return { latitude: c.latitude, longitude: c.longitude };
}

/**
 * Tạo độ lệch ngẫu nhiên quanh tọa độ (1–3 mét) để tránh vị trí "quá hoàn hảo".
 * @param coord Tọa độ gốc
 * @param radiusMeters Bán kính lệch (m), mặc định 2
 */
export function applyRandomOffset(
  coord: LatLng,
  radiusMeters: number = 2
): LatLng {
  return randomCoordinateInRadius(
    coord.latitude,
    coord.longitude,
    radiusMeters
  );
}

/**
 * Chia nhỏ polyline thành các điểm con sao cho mỗi bước = 1 giây (1Hz) theo tốc độ.
 * Dùng geolib: getDistance, getGreatCircleBearing, computeDestinationPoint.
 */
export function interpolatePoints(
  polyline: LatLng[],
  speedKmH: number
): LatLng[] {
  if (polyline.length < 2) return [...polyline];
  const distancePerSecond = (speedKmH * 1000) / 3600; // m/s
  const result: LatLng[] = [];

  for (let i = 0; i < polyline.length - 1; i++) {
    const A = toGeolibCoord(polyline[i]);
    const B = toGeolibCoord(polyline[i + 1]);
    const dist = getDistance(A, B);
    if (dist < 0.01) {
      if (i === 0) result.push(polyline[i]);
      result.push(polyline[i + 1]);
      continue;
    }
    const bearing = getGreatCircleBearing(A, B);
    const numSteps = Math.max(1, Math.ceil(dist / distancePerSecond));

    if (i === 0) result.push(polyline[i]);
    for (let j = 1; j < numSteps; j++) {
      const d = (dist * j) / numSteps;
      const point = computeDestinationPoint(A, d, bearing);
      result.push({ latitude: point.latitude, longitude: point.longitude });
    }
    result.push(polyline[i + 1]);
  }
  return result;
}

export interface SimulationOptions {
  onUpdate: (position: LatLng, index: number) => void;
  onComplete?: () => void;
  isLooping?: boolean;
  /** Bán kính random offset (m). 0 = tắt. */
  applyOffsetRadius?: number;
}

export type SimulationControl = {
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

/**
 * Chạy giả lập di chuyển: setInterval 1000ms, hỗ trợ Pause / Resume / Stop.
 * Loop: khi đến cuối route thì reverse mảng và đi ngược về điểm xuất phát.
 */
export function startSimulation(
  route: LatLng[],
  speedKmH: number,
  options: SimulationOptions
): SimulationControl {
  const { onUpdate, onComplete, isLooping = false, applyOffsetRadius = 0 } = options;
  let currentRoute: LatLng[] = interpolatePoints(route, speedKmH);
  let currentIndex = 0;
  let paused = false;
  let stopped = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const tick = () => {
    if (stopped || paused) return;
    if (currentIndex >= currentRoute.length) {
      if (isLooping) {
        currentRoute = [...currentRoute].reverse();
        currentIndex = 0;
      } else {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
        onComplete?.();
        return;
      }
    }
    let position = currentRoute[currentIndex];
    if (applyOffsetRadius > 0) {
      position = applyRandomOffset(position, applyOffsetRadius);
    }
    onUpdate(position, currentIndex);
    currentIndex++;
  };

  intervalId = setInterval(tick, 1000);
  tick(); // emit first position ngay

  return {
    pause: () => {
      paused = true;
    },
    resume: () => {
      paused = false;
    },
    stop: () => {
      stopped = true;
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    },
  };
}

/**
 * Hook giả lập vị trí: dùng từ HomeScreen, tự dọn interval khi unmount.
 */
export function useLocationSimulator() {
  const controlRef = useRef<SimulationControl | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);

  const stop = useCallback(() => {
    controlRef.current?.stop();
    controlRef.current = null;
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    return () => {
      controlRef.current?.stop();
      controlRef.current = null;
    };
  }, []);

  const start = useCallback(
    (
      route: LatLng[],
      speedKmH: number,
      options: {
        onComplete?: () => void;
        isLooping?: boolean;
        applyOffsetRadius?: number;
      } = {}
    ) => {
      if (route.length < 2) return;
      stop();
      setIsRunning(true);
      setIsPaused(false);
      controlRef.current = startSimulation(route, speedKmH, {
        onUpdate: (position) => setCurrentPosition(position),
        onComplete: () => {
          setIsRunning(false);
          options.onComplete?.();
        },
        isLooping: options.isLooping,
        applyOffsetRadius: options.applyOffsetRadius ?? 2,
      });
    },
    [stop]
  );

  const pause = useCallback(() => {
    controlRef.current?.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    controlRef.current?.resume();
    setIsPaused(false);
  }, []);

  return {
    start,
    pause,
    resume,
    stop,
    isRunning,
    isPaused,
    currentPosition,
  };
}

/**
 * Tính vị trí tiếp theo trên đoạn thẳng A -> B sau một bước thời gian.
 * speedKmh: tốc độ km/h, deltaSeconds: thời gian đã trôi (s).
 * Trả về tọa độ mới và hasReachedEnd.
 */
export function moveAlongSegment(
  from: LatLng,
  to: LatLng,
  speedKmh: number,
  deltaSeconds: number
): { position: LatLng; hasReachedEnd: boolean } {
  const distTotal = distanceInMeters(
    from.latitude,
    from.longitude,
    to.latitude,
    to.longitude
  );
  if (distTotal < 0.1) {
    return { position: { ...to }, hasReachedEnd: true };
  }
  const speedMps = kmhToMps(speedKmh);
  const stepMeters = speedMps * deltaSeconds;
  if (stepMeters >= distTotal) {
    return { position: { ...to }, hasReachedEnd: true };
  }
  const t = stepMeters / distTotal;
  const lat = from.latitude + (to.latitude - from.latitude) * t;
  const lng = from.longitude + (to.longitude - from.longitude) * t;
  return {
    position: { latitude: lat, longitude: lng },
    hasReachedEnd: false,
  };
}

/**
 * Lấy chỉ số segment hiện tại và tiến độ trong route (mảng điểm).
 */
export function getCurrentSegmentIndex(
  currentPosition: LatLng,
  routePoints: LatLng[]
): { segmentIndex: number; progressInSegment: number } {
  if (routePoints.length < 2) {
    return { segmentIndex: 0, progressInSegment: 1 };
  }
  let minDist = Infinity;
  let bestSegment = 0;
  let bestT = 0;
  for (let i = 0; i < routePoints.length - 1; i++) {
    const A = routePoints[i];
    const B = routePoints[i + 1];
    const distA = distanceInMeters(
      currentPosition.latitude,
      currentPosition.longitude,
      A.latitude,
      A.longitude
    );
    const distB = distanceInMeters(
      currentPosition.latitude,
      currentPosition.longitude,
      B.latitude,
      B.longitude
    );
    const segLen = distanceInMeters(A.latitude, A.longitude, B.latitude, B.longitude);
    if (segLen < 0.01) {
      const d = Math.min(distA, distB);
      if (d < minDist) {
        minDist = d;
        bestSegment = i;
        bestT = distA < distB ? 0 : 1;
      }
      continue;
    }
    const t = Math.max(0, Math.min(1, 1 - (distB * distB - distA * distA - segLen * segLen) / (2 * segLen * distA) || 0));
    const projLat = A.latitude + (B.latitude - A.latitude) * t;
    const projLng = A.longitude + (B.longitude - A.longitude) * t;
    const dist = distanceInMeters(
      currentPosition.latitude,
      currentPosition.longitude,
      projLat,
      projLng
    );
    if (dist < minDist) {
      minDist = dist;
      bestSegment = i;
      bestT = t;
    }
  }
  return { segmentIndex: bestSegment, progressInSegment: bestT };
}
