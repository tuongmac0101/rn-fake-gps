/**
 * Tạo tọa độ ngẫu nhiên trong bán kính (meters) từ một điểm.
 * Sử dụng công thức Haversine đơn giản hóa cho khoảng cách nhỏ.
 */
export function randomCoordinateInRadius(
  lat: number,
  lng: number,
  radiusMeters: number
): { latitude: number; longitude: number } {
  const radiusInDegrees = radiusMeters / 111320; // ~111.32km per degree at equator
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  const newLng = x / Math.cos((lat * Math.PI) / 180) + lng;
  return {
    latitude: lat + y,
    longitude: newLng,
  };
}

/**
 * Tính khoảng cách giữa hai điểm (Haversine), đơn vị mét.
 */
export function distanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Chuyển tốc độ km/h sang mét/giây.
 */
export function kmhToMps(kmh: number): number {
  return (kmh * 1000) / 3600;
}
