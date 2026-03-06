// generate-ui-kitten-theme.ts
// Comment in EN as you prefer.

import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { ThemeType } from "@ui-kitten/components";

/** ---------- Utilities ---------- */
type RGB = { r: number; g: number; b: number };
type Theme = Record<string, string>;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex: string): RGB {
  const m = HEX.exec(hex.trim());
  if (!m) throw new Error(`Invalid HEX: ${hex}`);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}
function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}
function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r * (1 - t) + b.r * t),
    g: Math.round(a.g * (1 - t) + b.g * t),
    b: Math.round(a.b * (1 - t) + b.b * t),
  };
}
function toRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

/** ---------- Core: scale generator ----------
 * Seed được xem là -500.
 * Tints (100..400) = trộn với trắng; Shades (600..900) = trộn với đen.
 * Tỉ lệ pha “Eva-ish”, gần với cảm giác của generator web.
 */
function generateScale(
  seedHex: string,
  prefix: string,
  opts?: {
    tints?: number[]; // 4 numbers -> 100..400
    shades?: number[]; // 4 numbers -> 600..900
  }
) {
  const white: RGB = { r: 255, g: 255, b: 255 };
  const black: RGB = { r: 0, g: 0, b: 0 };
  const base = hexToRgb(seedHex);

  const tints = opts?.tints ?? [0.9, 0.75, 0.6, 0.35];
  const shades = opts?.shades ?? [0.15, 0.3, 0.45, 0.6];

  const out: Theme = {};
  [100, 200, 300, 400].forEach((k, i) => {
    out[`${prefix}-${k}`] = rgbToHex(mix(base, white, clamp01(tints[i])));
  });
  out[`${prefix}-500`] = rgbToHex(base);
  [600, 700, 800, 900].forEach((k, i) => {
    out[`${prefix}-${k}`] = rgbToHex(mix(base, black, clamp01(shades[i])));
  });

  // Transparent from -500 theo chuẩn Eva
  const alphas: Record<number, number> = {
    100: 0.08,
    200: 0.16,
    300: 0.24,
    400: 0.32,
    500: 0.4,
    600: 0.48,
  };
  const base500 = out[`${prefix}-500`];
  Object.entries(alphas).forEach(([k, a]) => {
    out[`${prefix}-transparent-${k}`] = toRgba(base500, a);
  });

  return out;
}

/** ---------- Resolver: thay $token bằng giá trị thực (đệ quy) ---------- */
function resolveTokenRefs(theme: Theme): Theme {
  const cache = new Map<string, string>();

  const resolveValue = (val: string, stack: string[] = []): string => {
    if (!val.startsWith("$")) return val;
    const token = val.slice(1);
    if (stack.includes(token))
      throw new Error(`Circular reference: ${[...stack, token].join(" -> ")}`);
    if (cache.has(token)) return cache.get(token)!;
    const target = theme[token];
    if (!target) throw new Error(`Missing token: ${token}`);
    const resolved = resolveValue(target, [...stack, token]);
    cache.set(token, resolved);
    return resolved;
  };

  const out: Theme = {};
  Object.entries(theme).forEach(([k, v]) => (out[k] = resolveValue(v)));
  return out;
}

/** ---------- Public API: giống web export ----------
 * seeds: 5 màu seed (ảnh bạn gửi)
 * template: file JSON UI Kitten của bạn (đang có nhiều $token)
 * Kết quả: JSON cuối chỉ có HEX/RGBA, không còn $token.
 */
export function buildThemeFromSeeds(seeds: {
  primary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
}): Theme {
  const theme: Theme = {};
  Object.assign(theme, generateScale(seeds.primary, "color-primary"));
  Object.assign(theme, generateScale(seeds.success, "color-success"));
  Object.assign(theme, generateScale(seeds.info, "color-info"));
  Object.assign(theme, generateScale(seeds.warning, "color-warning"));
  Object.assign(theme, generateScale(seeds.danger, "color-danger"));
  return theme;
}

export const buildThemeNavigation = (
  themeMode: "light" | "dark",
  theme: ThemeType
) => {
  const isDark = themeMode === "dark";
  const resolvedTheme = resolveTokenRefs(theme as any);
  if (isDark) {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: resolvedTheme["color-primary-default"],
        background: resolvedTheme["background-alternative-color-1"],
        card: resolvedTheme["background-basic-color-1"],
        // text: resolvedTheme["text-alternate-color"],
        border: resolvedTheme["border-alternative-color-3"],
        // notification: resolvedTheme["color-danger-default"],
      },
    };
  }
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: resolvedTheme["color-primary-default"],
      background: resolvedTheme["background-basic-color-1"],
      card: resolvedTheme["background-basic-color-1"],
      //   text: resolvedTheme["text-basic-color"],
      // border: resolvedTheme["border-basic-color-3"],
      //   notification: resolvedTheme["color-danger-default"],
    },
  };
};
