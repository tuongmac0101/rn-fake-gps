import React from "react";
import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from "@shopify/flash-list";
import { LayoutChangeEvent, View } from "react-native";
import {
  DEFAULT_SAMPLE_COUNT,
  useEstimatedItemSize,
} from "./use-estimated-Item-size";

type WithOnLayout = {
  onLayout?: (e: LayoutChangeEvent) => void;
};

const FALLBACK_ESTIMATED = 100;

export const KitFlatList = <T,>(props: FlashListProps<T>) => {
  const { estimatedItemSize, renderItem, ...restProps } = props;

  // 1) Nếu caller đã truyền estimatedItemSize hợp lệ → dùng luôn
  if (
    estimatedItemSize &&
    !isNaN(Number(estimatedItemSize)) &&
    Number(estimatedItemSize) > 0
  ) {
    return (
      <FlashList
        {...restProps}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
      />
    );
  }

  // 2) Tự ước lượng
  const { estimatedSize, onItemLayout } = useEstimatedItemSize();

  const injectOnLayout = (
    node: React.ReactNode,
    handler: (e: LayoutChangeEvent) => void
  ) => {
    // Không phải element → không thể gắn onLayout
    if (!React.isValidElement(node)) return node as any;

    // Fragment không hỗ trợ onLayout → bọc nhẹ bằng View cho đúng layout
    if (node.type === React.Fragment) {
      return <View onLayout={handler}>{node}</View>;
    }

    // Ép kiểu props có onLayout để TS chấp nhận
    const element = node as React.ReactElement<WithOnLayout>;
    const prevOnLayout = element.props.onLayout;

    const composed = (e: LayoutChangeEvent) => {
      prevOnLayout?.(e);
      handler(e);
    };

    // cloneElement sẽ tự merge props cũ, không cần spread element.props
    return React.cloneElement<WithOnLayout>(element, { onLayout: composed });
  };

  const measuredRenderItem = (info: ListRenderItemInfo<T>) => {
    const node = renderItem?.(info);
    const needMeasure = !estimatedSize && info.index < DEFAULT_SAMPLE_COUNT; // chỉ đo vài item đầu
    return needMeasure ? injectOnLayout(node, onItemLayout) : (node as any);
  };

  return (
    <FlashList
      {...restProps}
      renderItem={measuredRenderItem}
      estimatedItemSize={estimatedSize ?? FALLBACK_ESTIMATED}
    />
  );
};
