import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

export function isIphoneX() {
  const dim = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dim.height === 780 ||
      dim.width === 780 ||
      dim.height === 812 || //iphone X, 12 mini, iphone 11 pro,
      dim.width === 812 ||
      dim.height === 844 || //12 pro
      dim.width === 844 ||
      dim.height === 896 || //iphone 11 pro max
      dim.width === 896 ||
      dim.height === 926 || //iphone 12 pro max
      dim.width === 926 ||
      dim.height === 932 || //iphone 14 pro max
      dim.width === 430)
  );
}
const { width, height } = Dimensions.get("window");

export const deviceWidth = width;
export const deviceHeight = height;
export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe: boolean) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 35, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export const widthPercentageToDP = (widthPercent: number) => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((deviceWidth * elemWidth) / 100);
};

export function getCurrentMonth() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  return currentMonth;
}

export function getMonth() {
  return new Date();
}

export function getDaysArray(dateString: string) {
  const names = Object.freeze([
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ]);
  return (year: number, month: number) => {
    const monthIndex = month - 1;
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() == monthIndex) {
      result.push(`${date.getDate()}-${names[date.getDay()]}`);
      date.setDate(date.getDate() + 1);
    }
    return result;
  };
}

export function isDateInCurrentMonth(dateString: string) {
  // Tạo đối tượng ngày từ chuỗi ngày
  const date = new Date(dateString);

  // Lấy ngày, tháng, và năm từ đối tượng ngày
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // So sánh ngày và tháng của ngày được cung cấp với ngày hiện tại
  return (
    day === currentDate.getDate() &&
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear()
  );
}

export function formatMoneyD(money?: number | string) {
  if (!!money || money == 0) {
    if (money && money.toString().length > 0) {
      return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ";
    } else {
      return money + "đ";
    }
  } else {
    return "0đ";
  }
}
export function formatMoneyVND(money: number) {
  if (!!money || money == 0) {
    if (money && money.toString().length > 0) {
      return (
        money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ"
      );
    } else {
      return money + " VNĐ";
    }
  } else {
    return "0 VNĐ";
  }
}

export function replaceMoney(str: string) {
  if (str && typeof str == "string") return str.replace(/\./g, "");
  else return "0";
}

export function calculateMath(a: number, b: number, operation: string) {
  a = a || 0;
  b = b || 0;
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Division by zero is not allowed");
      }
      return a / b;
    default:
      throw new Error("Invalid operation");
  }
}

export function removeEmptyFields(obj: any) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (
      newObj[key] === "" ||
      newObj[key] === null ||
      newObj[key] === undefined
    ) {
      delete newObj[key];
    }
  });
  return newObj;
}

export const isIOS = Platform.OS === "ios";

export const getRandomImage = (imageList: any) => {
  const images = Object.values(imageList); // Lấy mảng các ảnh
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

/**
 * Kiểm tra xem một object có value hay không
 * @param obj Object cần kiểm tra
 * @returns boolean
 */
export function hasValue(obj: any): boolean {
  if (!obj) return false;
  if (typeof obj !== "object") return false;
  return Object.keys(obj).length > 0;
}

/**
 * Kiểm tra xem một object có value hợp lệ hay không (không phải null, undefined, empty string)
 * @param obj Object cần kiểm tra
 * @returns boolean
 */
export function hasValidValue(obj: any): boolean {
  if (!obj) return false;
  if (typeof obj !== "object") return false;

  return Object.values(obj).some((value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    return true;
  });
}

/**
 * Kiểm tra xem một object có value cho một key cụ thể hay không
 * @param obj Object cần kiểm tra
 * @param key Key cần kiểm tra
 * @returns boolean
 */
export function hasValueForKey(obj: any, key: string): boolean {
  if (!obj || !key) return false;
  if (typeof obj !== "object") return false;

  const value = obj[key];
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}
