import { useState, useRef } from "react";
import { LayoutChangeEvent } from "react-native";

export const DEFAULT_SAMPLE_COUNT = 5;

/**
 *
 * @param sampleCount - số lượng item mẫu để tính kích thước trung bình, default = DEFAULT_SAMPLE_COUNT
 * @returns
 */

export const useEstimatedItemSize = (
  sampleCount: number = DEFAULT_SAMPLE_COUNT
) => {
  const [estimatedSize, setEstimatedSize] = useState<number | undefined>(
    undefined
  );
  const measurements = useRef<number[]>([]);

  const onItemLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (measurements.current.length < sampleCount) {
      measurements.current.push(height);
      if (measurements.current.length === sampleCount) {
        const avg = Math.round(
          measurements.current.reduce((a, b) => a + b, 0) /
            measurements.current.length
        );
        setEstimatedSize(avg);
      }
    }
  };

  return { estimatedSize, onItemLayout };
};
