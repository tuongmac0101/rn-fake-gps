import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "rn-expo-google-places-autocomplete";

const apiKey =
  process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ||
  process.env.EXPO_PUBLIC_KEY_MAP_ANDROID ||
  "";

export interface SearchBarProps {
  onPlaceSelect: (lat: number, lng: number, description?: string) => void;
}

export function SearchBar({ onPlaceSelect }: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputCard}>
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          placeholder="Nhập địa điểm cần tìm..."
          onPlaceSelected={(details) => {
            const { coordinate, formattedAddress } = details;
            onPlaceSelect(
              coordinate.latitude,
              coordinate.longitude,
              formattedAddress
            );
          }}
          onSearchError={(err) => {
            if (__DEV__) {
              console.warn("Places search error:", err);
            }
          }}
          requestConfig={{ countries: ["VN"] }}
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          searchInputStyle={styles.searchInput}
          resultsContainerStyle={styles.resultsContainer}
          resultItemStyle={styles.resultItem}
          listFooterStyle={styles.resultsFooter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: 4,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
  },
  container: {
    flex: 0,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    minHeight: 52,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 16,
    color: "#0f172a",
    padding: 0,
    fontWeight: "500",
  },
  resultsContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    marginTop: 0,
    maxHeight: 320,
    paddingBottom: 8,
  },
  resultItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    minHeight: 52,
    justifyContent: "center",
  },
  resultsFooter: {
    height: 8,
  },
});
