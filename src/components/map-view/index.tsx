import React, { useRef, useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import RNMapView, { Marker, Polyline } from "react-native-maps";
import type { LatLng } from "~/services/locationService";

const DEFAULT_REGION = {
  latitude: 21.0285,
  longitude: 105.8542,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export type MarkerType = "current" | "A" | "B";

export interface MapViewProps {
  style?: ViewStyle;
  currentPosition: LatLng | null;
  pointA: LatLng | null;
  pointB: LatLng | null;
  routePoints?: LatLng[];
  onPress?: (e: { nativeEvent: { coordinate: LatLng } }) => void;
  /** Gọi khi bấm vào marker (Điểm A, Điểm B, hoặc vị trí hiện tại). */
  onMarkerPress?: (coordinate: LatLng, type: MarkerType) => void;
}

export default function MapView({
  style,
  currentPosition,
  pointA,
  pointB,
  routePoints = [],
  onPress,
  onMarkerPress,
}: MapViewProps) {
  const mapRef = useRef<RNMapView>(null);

  const points = routePoints.length >= 2 ? routePoints : (pointA && pointB ? [pointA, pointB] : []);

  useEffect(() => {
    if (currentPosition && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...currentPosition,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        300
      );
    }
  }, [currentPosition?.latitude, currentPosition?.longitude]);

  return (
    <RNMapView
      ref={mapRef}
      style={[styles.map, style]}
      initialRegion={DEFAULT_REGION}
      showsUserLocation={false}
      showsMyLocationButton={true}
      onPress={onPress}
    >
      {currentPosition && (
        <Marker
          coordinate={currentPosition}
          title="Vị trí hiện tại"
          pinColor="#3b82f6"
          onPress={() => onMarkerPress?.(currentPosition, "current")}
        />
      )}
      {pointA && (
        <Marker
          coordinate={pointA}
          title="Điểm A"
          pinColor="#22c55e"
          onPress={() => onMarkerPress?.(pointA, "A")}
        />
      )}
      {pointB && (
        <Marker
          coordinate={pointB}
          title="Điểm B"
          pinColor="#ef4444"
          onPress={() => onMarkerPress?.(pointB, "B")}
        />
      )}
      {points.length >= 2 && (
        <Polyline
          coordinates={points}
          strokeColor="#3b82f6"
          strokeWidth={4}
        />
      )}
    </RNMapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
