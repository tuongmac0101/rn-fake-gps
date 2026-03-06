import { getLocales, Locale } from "expo-localization";

/**
 * Default locale configuration (Vietnamese - vi-VN)
 * Used when expo-localization cannot get device locale
 */
const DEFAULT_LOCALE_CONFIG = {
  languageTag: "vi-VN",
  languageCode: "vi",
  regionCode: "VN",
  decimalSeparator: ",",
  digitGroupingSeparator: ".",
  textDirection: "ltr" as const,
  measurementSystem: "metric" as const,
  currencyCode: "VND",
  currencySymbol: "₫",
  temperatureUnit: "celsius" as const,
};

// Cache locale data to avoid multiple calls
let cachedLocaleData: Locale | null = null;
let useDefaultLocale = false;

/**
 * Get cached locale data from expo-localization
 * Returns the first locale from getLocales() or default config if unavailable
 */
function getLocaleData(): Locale | typeof DEFAULT_LOCALE_CONFIG {
  if (cachedLocaleData) return cachedLocaleData;
  if (useDefaultLocale) return DEFAULT_LOCALE_CONFIG;

  try {
    const locales = getLocales();
    if (locales && locales.length > 0) {
      cachedLocaleData = locales[0];
      console.log("=== LOCALE DATA ===", JSON.stringify(cachedLocaleData));
      return cachedLocaleData;
    }
  } catch (error) {
    console.warn("Failed to get locale data, using default:", error);
  }

  // Use default config when expo-localization fails
  useDefaultLocale = true;
  console.log("=== USING DEFAULT LOCALE ===", JSON.stringify(DEFAULT_LOCALE_CONFIG));
  return DEFAULT_LOCALE_CONFIG;
}

/**
 * Get the device's primary locale
 * @returns locale string like "vi-VN", "en-US", "de-DE"
 */
export function getDeviceLocale(): string {
  const locale = getLocaleData();
  return locale.languageTag;
}

/**
 * Get the decimal separator for the device's locale
 * Uses expo-localization's decimalSeparator directly
 * @returns "." for en-US, "," for vi-VN, de-DE, fr-FR
 */
export function getDecimalSeparator(): string {
  const locale = getLocaleData();
  return locale.decimalSeparator || DEFAULT_LOCALE_CONFIG.decimalSeparator;
}

/**
 * Get the thousand (group) separator for the device's locale
 * Uses expo-localization's digitGroupingSeparator directly
 * @returns "," for en-US, "." for vi-VN, de-DE, " " for fr-FR
 */
export function getThousandSeparator(): string {
  const locale = getLocaleData();
  return locale.digitGroupingSeparator || DEFAULT_LOCALE_CONFIG.digitGroupingSeparator;
}

/**
 * Format a number according to device locale (no currency symbol)
 * Uses separator values directly from locale config
 * @param value - the number to format
 * @param decimalPlaces - max decimal places (default: 2)
 * @returns formatted string like "1,234.56" (en-US) or "1.234,56" (vi-VN)
 */
export function formatNumber(
  value: number,
  decimalPlaces: number = 2
): string {
  try {
    const decimalSep = getDecimalSeparator();
    const thousandSep = getThousandSeparator();

    // Round the value first
    const roundedValue = roundDecimalValue(value, decimalPlaces, "round");

    // Convert to string with proper decimal places
    const fixedStr = roundedValue.toFixed(decimalPlaces);

    // Split into integer and decimal parts
    const parts = fixedStr.split(".");
    const integerPart = parts[0] || "0";
    const decimalPart = parts[1] || "";

    // Add thousand separators to integer part
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSep
    );

    // Remove trailing zeros from decimal part
    const trimmedDecimal = decimalPart.replace(/0+$/, "");

    // Return formatted result
    if (!trimmedDecimal) {
      return formattedInteger;
    }

    return `${formattedInteger}${decimalSep}${trimmedDecimal}`;
  } catch (error) {
    console.warn("Failed to format number:", error);
    return value.toString();
  }
}

/**
 * Format an integer according to device locale (no decimals)
 * Uses separator values directly from locale config
 * @param value - the number to format
 * @returns formatted string like "1,234" (en-US) or "1.234" (vi-VN)
 */
export function formatInteger(value: number): string {
  try {
    const thousandSep = getThousandSeparator();
    const intValue = Math.round(value).toString();
    return intValue.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  } catch (error) {
    console.warn("Failed to format integer:", error);
    return Math.round(value).toString();
  }
}

/**
 * Parse a locale-formatted string back to a number
 * Handles both "." and "," as decimal separators
 * @param value - the string to parse (e.g., "1.234,56" or "1,234.56")
 * @returns the numeric value
 */
export function parseLocaleNumber(value: string): number {
  try {
    if (!value || value.trim() === "") return 0;

    const decimalSep = getDecimalSeparator();
    const thousandSep = getThousandSeparator();

    let normalized = value.trim();

    // Remove thousand separators
    if (thousandSep) {
      normalized = normalized.split(thousandSep).join("");
    }

    // Convert locale decimal separator to standard "."
    if (decimalSep && decimalSep !== ".") {
      normalized = normalized.replace(decimalSep, ".");
    }

    const result = parseFloat(normalized);
    return isNaN(result) ? 0 : result;
  } catch (error) {
    console.warn("Failed to parse locale number:", error);
    // Fallback: try simple parseFloat with both separators replaced
    const fallback = value.replace(/,/g, ".");
    const result = parseFloat(fallback);
    return isNaN(result) ? 0 : result;
  }
}

/**
 * Normalize input text to handle both "." and "," as decimal input
 * Returns text with the correct decimal separator for the locale
 * @param text - raw input text
 * @returns normalized text with correct decimal separator
 */
export function normalizeDecimalInput(text: string): string {
  try {
    const decimalSep = getDecimalSeparator();

    // Replace the "other" separator with the locale's decimal separator
    if (decimalSep === ",") {
      return text.replace(".", ",");
    } else {
      return text.replace(",", ".");
    }
  } catch (error) {
    console.warn("Failed to normalize decimal input:", error);
    // Fallback: return text with dot as decimal separator
    return text.replace(",", ".");
  }
}

/**
 * Validate decimal input - allows digits, one decimal separator, and handles locale
 * @param text - input text to validate
 * @param maxDecimalPlaces - max decimal places allowed (default: 4)
 * @returns true if valid input
 */
export function validateDecimalInput(
  text: string,
  maxDecimalPlaces: number = 4
): boolean {
  try {
    if (text === "" || text === "." || text === ",") return true;

    // Normalize to use "." for validation
    const normalized = text.replace(",", ".");

    // Check format: digits, optional single decimal point, limited decimal places
    const decimalRegex = new RegExp(`^\\d*\\.?\\d{0,${maxDecimalPlaces}}$`);
    return decimalRegex.test(normalized) && !isNaN(Number(normalized));
  } catch (error) {
    console.warn("Failed to validate decimal input:", error);
    return true; // Allow input on error
  }
}

/**
 * Validate integer input - only allows digits
 * @param text - input text to validate
 * @returns true if valid integer input
 */
export function validateIntegerInput(text: string): boolean {
  try {
    if (text === "") return true;
    return /^\d+$/.test(text);
  } catch (error) {
    console.warn("Failed to validate integer input:", error);
    return true; // Allow input on error
  }
}

/**
 * Format input value for display while typing
 * Adds thousand separators as user types
 * @param text - current input text
 * @param isInteger - whether to format as integer only
 * @returns formatted text with thousand separators
 */
export function formatInputDisplay(
  text: string,
  isInteger: boolean = false
): string {
  try {
    if (!text || text === "." || text === ",") return text;

    const decimalSep = getDecimalSeparator();
    const thousandSep = getThousandSeparator();

    // Normalize to use "." internally
    let normalized = text.replace(",", ".");

    // Split into integer and decimal parts
    const parts = normalized.split(".");
    const integerPart = parts[0] || "";
    const decimalPart = parts[1];

    // Add thousand separators to integer part
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSep
    );

    // Return formatted result
    if (isInteger || decimalPart === undefined) {
      return formattedInteger;
    }

    return `${formattedInteger}${decimalSep}${decimalPart}`;
  } catch (error) {
    console.warn("Failed to format input display:", error);
    return text; // Return original text on error
  }
}

/**
 * Handle locale number input - cleans and formats input text
 * @param text - raw input text from TextInput
 * @param maxDecimalPlaces - maximum decimal places allowed (default: unlimited)
 * @returns formatted text with thousand separators
 */
export function handleLocaleNumberInput(
  text: string,
  maxDecimalPlaces?: number
): string {
  try {
    const thousandSep = getThousandSeparator();
    const decimalSep = getDecimalSeparator();

    // Remove thousand separators first to get raw number
    let cleanText = text.split(thousandSep).join("");

    // Only allow digits and the locale's decimal separator
    const escapedDecimalSep = decimalSep === "." ? "\\." : decimalSep;
    const allowedChars = new RegExp(`[^0-9${escapedDecimalSep}]`, "g");
    cleanText = cleanText.replace(allowedChars, "");

    // Only allow ONE decimal separator
    const sepRegex = new RegExp(`\\${decimalSep}`, "g");
    const matches = cleanText.match(sepRegex);
    if (matches && matches.length > 1) {
      const firstSepIndex = cleanText.indexOf(decimalSep);
      cleanText = cleanText.substring(0, firstSepIndex + 1) +
        cleanText.substring(firstSepIndex + 1).replace(sepRegex, "");
    }

    // Limit decimal places if specified
    if (maxDecimalPlaces !== undefined) {
      const sepIndex = cleanText.indexOf(decimalSep);
      if (sepIndex !== -1) {
        const beforeSep = cleanText.substring(0, sepIndex);
        let afterSep = cleanText.substring(sepIndex + 1);
        if (afterSep.length > maxDecimalPlaces) {
          afterSep = afterSep.substring(0, maxDecimalPlaces);
        }
        cleanText = `${beforeSep}${decimalSep}${afterSep}`;
      }
    }

    // Format with thousand separators for display
    return formatInputDisplay(cleanText);
  } catch (error) {
    console.warn("Failed to handle locale number input:", error);
    return text;
  }
}

/**
 * Handle locale integer input - only allows integers, no decimal
 * @param text - raw input text from TextInput
 * @returns formatted text with thousand separators (integer only)
 */
export function handleLocaleIntegerInput(text: string): string {
  try {
    const thousandSep = getThousandSeparator();

    // Remove thousand separators first to get raw number
    let cleanText = text.split(thousandSep).join("");

    // Only allow digits (no decimal separator)
    cleanText = cleanText.replace(/[^0-9]/g, "");

    // Format with thousand separators for display
    return formatInputDisplay(cleanText, true);
  } catch (error) {
    console.warn("Failed to handle locale integer input:", error);
    return text;
  }
}

/**
 * Round decimal helper (copied from format.helper to avoid circular deps)
 */
function roundDecimalValue(
  value: number,
  n: number = 0,
  mode: "ceil" | "floor" | "round" = "round"
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

export const LocaleHelper = {
  getDeviceLocale,
  getDecimalSeparator,
  getThousandSeparator,
  formatNumber,
  formatInteger,
  parseLocaleNumber,
  normalizeDecimalInput,
  validateDecimalInput,
  validateIntegerInput,
  formatInputDisplay,
  handleLocaleNumberInput,
  handleLocaleIntegerInput,
};
