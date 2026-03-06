import React, { useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { KitText } from "~/@ui-kit";
import { KitIcon } from "~/@ui-kit/kit-icon";
import { EvaSize, LiteralUnion } from "@ui-kitten/components/devsupport";

export type IAppearance = LiteralUnion<"filled" | "outline" | "ghost">;

type PresetColor =
  | "magenta"
  | "red"
  | "volcano"
  | "orange"
  | "gold"
  | "lime"
  | "green"
  | "cyan"
  | "blue"
  | "geekblue"
  | "purple";

export type KitTagProps = {
  children?: React.ReactNode;
  color?: PresetColor | string; // nếu không có => dùng màu theme
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  size?: EvaSize;
  appearance?: IAppearance;
  onPress?: (e: GestureResponderEvent) => void;
  onClose?: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  testID?: string;
};

const PRESET_COLORS: Record<
  PresetColor,
  { bg: string; border: string; text: string; filled: string }
> = {
  magenta: {
    bg: "#fff0f6",
    border: "#ffadd2",
    text: "#c41d7f",
    filled: "#eb2f96",
  },
  red: { bg: "#fff1f0", border: "#ffa39e", text: "#cf1322", filled: "#f5222d" },
  volcano: {
    bg: "#fff2e8",
    border: "#ffbb96",
    text: "#d4380d",
    filled: "#fa541c",
  },
  orange: {
    bg: "#fff7e6",
    border: "#ffd591",
    text: "#d46b08",
    filled: "#fa8c16",
  },
  gold: {
    bg: "#fffbe6",
    border: "#ffe58f",
    text: "#d48806",
    filled: "#faad14",
  },
  lime: {
    bg: "#fcffe6",
    border: "#eaff8f",
    text: "#7cb305",
    filled: "#a0d911",
  },
  green: {
    bg: "#f6ffed",
    border: "#b7eb8f",
    text: "#389e0d",
    filled: "#52c41a",
  },
  cyan: {
    bg: "#e6fffb",
    border: "#87e8de",
    text: "#08979c",
    filled: "#13c2c2",
  },
  blue: {
    bg: "#e6f4ff",
    border: "#91caff",
    text: "#0958d9",
    filled: "#1677ff",
  },
  geekblue: {
    bg: "#f0f5ff",
    border: "#adc6ff",
    text: "#1d39c4",
    filled: "#2f54eb",
  },
  purple: {
    bg: "#f9f0ff",
    border: "#d3adf7",
    text: "#531dab",
    filled: "#722ed1",
  },
};

const isHexColor = (c?: string) =>
  !!c && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(c);

function computeColors(
  color: string | undefined,
  appearance: IAppearance,
  theme: any
) {
  // =============== THEME DEFAULT ===============
  const themePrimary = theme["color-primary-500"];
  const themeText = theme["text-basic-color"];
  const themeBg = theme["background-basic-color-2"];
  const themeBorder = theme["border-basic-color-3"];
  const themeControlText = theme["text-control-color"]; // thường là trắng

  const neutral = {
    bg: themeBg,
    border: themeBorder,
    text: themeText,
    filled: themePrimary,
  };

  // =============== PRESET COLOR (antd-like) ===============
  if (color && !isHexColor(color) && PRESET_COLORS[color as PresetColor]) {
    const p = PRESET_COLORS[color as PresetColor];
    switch (appearance) {
      case "filled":
        return { bg: p.filled, border: p.filled, text: "#fff" };
      case "outline":
        return { bg: "transparent", border: p.border, text: p.text };
      case "ghost":
        return { bg: "transparent", border: "transparent", text: p.text };
      default:
        return { bg: p.bg, border: p.border, text: p.text };
    }
  }

  // =============== CUSTOM HEX COLOR ===============
  if (isHexColor(color)) {
    const base = color!.toUpperCase();
    switch (appearance) {
      case "filled":
        // background và border đều là base, text trắng
        return { bg: base, border: base, text: "#FFFFFF" };
      case "outline":
        // chỉ viền có màu, nền trong suốt, text cùng màu
        return { bg: "transparent", border: base, text: base };
      case "ghost":
        // chỉ text có màu, không viền, không nền
        return { bg: "transparent", border: "transparent", text: base };
      default:
        // default: màu nền nhạt nhẹ (thêm alpha 15%)
        return { bg: base + "26", border: base, text: base };
    }
  }

  // =============== THEME FALLBACK (UI Kitten tone) ===============
  switch (appearance) {
    case "filled":
      return {
        bg: neutral.filled,
        border: neutral.filled,
        text: themeControlText,
      };
    case "outline":
      return { bg: "transparent", border: neutral.border, text: neutral.text };
    case "ghost":
      return { bg: "transparent", border: "transparent", text: neutral.text };
    default:
      return neutral;
  }
}

function sizeStyle(size: EvaSize) {
  switch (size) {
    case "tiny":
      return { padV: 2, padH: 6, font: 10, close: 12 };
    case "small":
      return { padV: 3, padH: 8, font: 11, close: 13 };
    case "large":
      return { padV: 7, padH: 12, font: 14, close: 18 };
    case "giant":
      return { padV: 8, padH: 14, font: 15, close: 20 };
    default:
      return { padV: 5, padH: 10, font: 12, close: 16 };
  }
}

export const KitTag: React.FC<KitTagProps> = ({
  children,
  color,
  icon,
  closeIcon,
  closable,
  disabled,
  bordered,
  size = "medium",
  appearance = "filled",
  onPress,
  onClose,
  style,
  textStyle,
  contentContainerStyle,
}) => {
  const theme = useTheme();
  const colors = useMemo(
    () => computeColors(color, appearance, theme),
    [color, appearance, theme]
  );

  const sz = sizeStyle(size);

  const hasBorder =
    typeof bordered === "boolean" ? bordered : appearance === "outline";

  const baseContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: hasBorder ? StyleSheet.hairlineWidth : 0,
    borderRadius: 12,
    opacity: disabled ? 0.6 : 1,
    paddingVertical: sz.padV,
    paddingHorizontal: sz.padH,
    alignSelf: "flex-start",
  };

  const handleClose = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onClose?.(e);
    },
    [onClose]
  );

  const Close = () =>
    closable ? (
      <Pressable onPress={handleClose} hitSlop={6} disabled={disabled}>
        {closeIcon ?? (
          <KitIcon name="close-outline" size={sz.close} color={colors.text} />
        )}
      </Pressable>
    ) : null;

  const Content = () => (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", gap: 6 },
        contentContainerStyle,
      ]}
    >
      {icon && <View>{icon}</View>}
      <KitText
        numberOfLines={1}
        style={[{ color: colors.text, fontSize: sz.font }, textStyle]}
      >
        {children}
      </KitText>
      <Close />
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable style={[baseContainer, style]} onPress={onPress}>
        <Content />
      </Pressable>
    );
  }

  return (
    <View style={[baseContainer, style]}>
      <Content />
    </View>
  );
};
