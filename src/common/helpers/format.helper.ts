import {
  formatNumber as localeFormatNumber,
  formatInteger as localeFormatInteger,
  parseLocaleNumber,
  getDeviceLocale,
} from "./locale.helper";

function formatVND(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

/**
 * @deprecated Use formatNumber instead for locale-aware formatting without currency symbol
 */
function formatVNDV2(value: number, decimalPlaces: number = 2): string {
  // Now uses device locale for formatting (without currency symbol)
  return localeFormatNumber(value, decimalPlaces);
}

/**
 * Format number according to device locale (no currency symbol)
 * @param value - number to format
 * @param decimalPlaces - max decimal places (default: 2)
 * @returns formatted string like "1,234.56" (en-US) or "1.234,56" (vi-VN)
 */
function formatNumber(value: number, decimalPlaces: number = 2): string {
  return localeFormatNumber(value, decimalPlaces);
}

/**
 * Format integer according to device locale (no decimals)
 * Used for master_unit which only accepts integers
 * @param value - number to format
 * @returns formatted string like "1,234" (en-US) or "1.234" (vi-VN)
 */
function formatInteger(value: number): string {
  return localeFormatInteger(value);
}

function formatEstimateDeliveryDateTimeToArray(
  startDateStr: string,
  endDateStr: string
) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // format ngày (dd/mm)
  const dd = String(startDate.getDate()).padStart(2, "0");
  const mm = String(startDate.getMonth() + 1).padStart(2, "0");
  const dateStr = `${dd}/${mm}`;

  // format giờ phút bằng toLocaleTimeString
  const formatTime = (d: Date) =>
    d
      .toLocaleTimeString("vi-VN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })
      .replace(":", "h"); // đổi "08:15" -> "8h15"

  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  return [dateStr, startTime, endTime];
}

function formatEstimateDeliveryDateTime(
  startDateStr: string,
  endDateStr: string
) {
  const [dateStr, startTime, endTime] = formatEstimateDeliveryDateTimeToArray(
    startDateStr,
    endDateStr
  );
  return `${dateStr} ${startTime}-${endTime}`;
}

function formatEstimateDeliveryDateTimeAddNull(
  startDateStr: string,
  endDateStr: string
) {
  if (!startDateStr || !endDateStr) return null;
  const [dateStr, startTime, endTime] = formatEstimateDeliveryDateTimeToArray(
    startDateStr,
    endDateStr
  );
  return `${dateStr} ${startTime}-${endTime}`;
}

/**
 * Làm tròn số với n chữ số thập phân (0–10)
 * @param value Số cần làm tròn
 * @param n Số chữ số thập phân (0 → 10)
 * @param mode Cách làm tròn: 'ceil' | 'floor' | 'round' (mặc định: 'ceil')
 * @returns Số sau khi làm tròn
 */
export function roundDecimal(
  value: number,
  n: number = 0,
  mode: "ceil" | "floor" | "round" = "ceil"
): number {
  if (typeof value !== "number" || isNaN(value)) return 0;
  if (n < 0) n = 0;
  if (n > 10) n = 10;

  const factor = Math.pow(10, n);
  switch (mode) {
    case "floor":
      return Math.floor(value * factor) / factor;
    case "round":
      return Math.round(value * factor) / factor;
    case "ceil":
    default:
      return Math.ceil(value * factor) / factor;
  }
}

export function formatEnumLabel<T extends string | number>(
  value: T | undefined | null,
  labelMap: Partial<Record<T, string>>
): string {
  if (value === undefined || value === null) return "";
  const translationKey = labelMap[value];
  return translationKey || "";
}

type FormatOptions = {
  locale?: string; // default "vi-VN"
  useUTC?: boolean;
};

export function formatDateByPattern(
  input: string | number | Date,
  pattern: string = "dd/MM/yyyy",
  opts: FormatOptions = {}
) {
  const { locale = "vi-VN", useUTC = false } = opts;

  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  const dd = String(useUTC ? date.getUTCDate() : date.getDate()).padStart(
    2,
    "0"
  );
  const MM = String(
    (useUTC ? date.getUTCMonth() : date.getMonth()) + 1
  ).padStart(2, "0");
  const yyyy = String(useUTC ? date.getUTCFullYear() : date.getFullYear());

  // time theo đúng yêu cầu
  const time = date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    ...(useUTC ? { timeZone: "UTC" as const } : {}),
  });

  const tokens: Record<string, string> = {
    yyyy,
    dd,
    MM,
    time, // ví dụ: "15:04"
  };

  // thay token (match dài trước)
  const tokenRegex = /(yyyy|MM|dd|time)/g;
  return pattern.replace(tokenRegex, (t) => tokens[t] ?? t);
}

export const FormatHelper = {
  formatVND,
  formatEstimateDeliveryDateTime,
  formatEstimateDeliveryDateTimeAddNull,
  formatEstimateDeliveryDateTimeToArray,
  roundDecimal,
  formatEnumLabel,
  formatDateByPattern,
  formatVNDV2,
  // New locale-aware functions
  formatNumber,
  formatInteger,
  parseLocaleNumber,
  getDeviceLocale,
};
