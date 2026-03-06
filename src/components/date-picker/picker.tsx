import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { KitText } from "~/@ui-kit";

// --- Utility Functions ---

export const getInitialFromDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

// Reset time to start of day for accurate date comparison
const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Reset time to end of day
const endOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const convertDateToStringArray = (date: Date | null | undefined): string[] => {
  if (!date) return ["2000", "1", "1"]; // Fallback safe
  return [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString(),
    date.getDate().toString(),
  ];
};

const convertStringArrayToDate = (value: string[]): Date => {
  const year = parseInt(value[0] || "2000");
  const month = parseInt(value[1] || "1");
  const day = parseInt(value[2] || "1");
  return new Date(year, month - 1, day);
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

// --- Interfaces ---

export interface ColumnItem {
  label: string;
  value: string;
}

export interface WheelProps {
  column: ColumnItem[];
  value?: string;
  onSelect: (value: string, index: number) => void;
  index: number;
  itemHeight: number;
}

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

interface DatePickerSidebarProps {
  mode: "start" | "end";
  currentRange: { startDate: Date | null; endDate: Date | null };
  onConfirm: (date: Date) => void;
  onClose: () => void;
  showActionButtons?: boolean;
  isFuture?: boolean;
}

// --- Components ---

export const Wheel: React.FC<WheelProps> = ({
  column,
  value,
  onSelect,
  index,
  itemHeight,
}) => {
  const scrollerRef = useRef<ScrollView>(null);
  const isUserScroll = useRef<boolean>(false);

  // Tính toán index cần scroll tới
  const getSelectIndex = useCallback(() => {
    const foundIndex = column.findIndex((item) => item.value === value);
    return foundIndex >= 0 ? foundIndex : 0;
  }, [column, value]);

  const scrollTo = useCallback(
    (y: number, animated: boolean = false) => {
      scrollerRef.current?.scrollTo({
        y,
        animated,
      });
    },
    []
  );

  // FIX: Thêm setTimeout để đảm bảo layout đã sẵn sàng trước khi scroll
  // Đặc biệt quan trọng khi dùng trong BottomSheet/Modal
  useEffect(() => {
    if (!isUserScroll.current) {
      const targetIndex = getSelectIndex();
      
      // Tăng delay lên 50-100ms để chờ Modal animation render xong layout
      const timer = setTimeout(() => {
        scrollTo(targetIndex * itemHeight, false);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [value, itemHeight, getSelectIndex, scrollTo, column]);

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isUserScroll.current = false;
      const scrollTop = e.nativeEvent.contentOffset.y;
      let selectIndex = Math.round(scrollTop / itemHeight);

      // Clamp index
      if (selectIndex < 0) selectIndex = 0;
      if (selectIndex >= column.length) selectIndex = column.length - 1;

      const selectedItem = column[selectIndex];
      // Chỉ gọi onSelect nếu giá trị thực sự thay đổi
      if (selectedItem && selectedItem.value !== value) {
        onSelect(selectedItem.value, index);
      }
    },
    [column, itemHeight, onSelect, value, index]
  );

  const onScrollBeginDrag = useCallback(() => {
    isUserScroll.current = true;
  }, []);

  const VISIBLE_ITEMS = 5;
  const CONTAINER_HEIGHT = itemHeight * VISIBLE_ITEMS;

  return (
    <View style={{ height: CONTAINER_HEIGHT, flex: 1, overflow: "hidden" }}>
      <ScrollView
        ref={scrollerRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        contentContainerStyle={{
          paddingVertical: (CONTAINER_HEIGHT - itemHeight) / 2,
        }}
      >
        {column.map((item) => (
          <View
            key={item.value}
            style={{
              height: itemHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <KitText
              style={{
                fontSize: 16,
                fontWeight: item.value === value ? "700" : "400",
                color: item.value === value ? "#3366FF" : "#000",
              }}
            >
              {item.label}
            </KitText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(2100, 0, 1),
}) => {
  const itemHeight = 34;

  // Memoize innerValue để đảm bảo nó luôn hợp lệ và nằm trong range
  const innerValue = useMemo(() => {
    if (!value) return new Date();
    let date = new Date(value);
    
    // Fallback nếu date invalid
    if (isNaN(date.getTime())) date = new Date();
    
    // Clamp date vào min/max
    if (date < startOfDay(minDate)) return minDate;
    if (date > endOfDay(maxDate)) return maxDate;
    
    return date;
  }, [value, minDate, maxDate]);

  const pickerValue = useMemo(() => {
    return convertDateToStringArray(innerValue);
  }, [innerValue]);

  const columns = useMemo(() => {
    const minYear = minDate.getFullYear();
    const minMonth = minDate.getMonth() + 1;
    const minDay = minDate.getDate();
    const maxYear = maxDate.getFullYear();
    const maxMonth = maxDate.getMonth() + 1;
    const maxDay = maxDate.getDate();

    const selectedYear = parseInt(pickerValue[0]);
    const selectedMonth = parseInt(pickerValue[1]);

    const isMinYear = selectedYear === minYear;
    const isMaxYear = selectedYear === maxYear;

    const years: ColumnItem[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push({ label: i.toString(), value: i.toString() });
    }

    const monthLower = isMinYear ? minMonth : 1;
    const monthUpper = isMaxYear ? maxMonth : 12;
    const months: ColumnItem[] = [];
    for (let i = monthLower; i <= monthUpper; i++) {
      months.push({ label: i.toString(), value: i.toString() });
    }

    const isMinMonth = isMinYear && selectedMonth === minMonth;
    const isMaxMonth = isMaxYear && selectedMonth === maxMonth;
    
    const dayLower = isMinMonth ? minDay : 1;
    let maxDaysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
    const dayUpper = isMaxMonth 
      ? Math.min(maxDay, maxDaysInCurrentMonth) 
      : maxDaysInCurrentMonth;

    const days: ColumnItem[] = [];
    for (let i = dayLower; i <= dayUpper; i++) {
      days.push({ label: i.toString(), value: i.toString() });
    }

    return [years, months, days];
  }, [minDate, maxDate, pickerValue]);

  const handleSelect = useCallback(
    (val: string, index: number) => {
      // 1. Copy mảng giá trị hiện tại
      const currentValues = [...pickerValue];
      // 2. Cập nhật giá trị mới tại cột đang chọn
      currentValues[index] = val;

      let year = parseInt(currentValues[0]);
      let month = parseInt(currentValues[1]);
      let day = parseInt(currentValues[2]);

      // 3. Logic Clamp (Kẹp) giá trị để luôn hợp lệ
      const minYear = minDate.getFullYear();
      const maxYear = maxDate.getFullYear();

      // Clamp Year
      if (year < minYear) year = minYear;
      if (year > maxYear) year = maxYear;

      const isMinYear = year === minYear;
      const isMaxYear = year === maxYear;

      const minMonth = isMinYear ? minDate.getMonth() + 1 : 1;
      const maxMonth = isMaxYear ? maxDate.getMonth() + 1 : 12;

      // Clamp Month
      if (month < minMonth) month = minMonth;
      if (month > maxMonth) month = maxMonth;

      const maxDays = getDaysInMonth(year, month);
      const isMinMonth = isMinYear && month === minMonth;
      const isMaxMonth = isMaxYear && month === maxMonth;
      
      const minDayLimit = isMinMonth ? minDate.getDate() : 1;
      const maxDayLimit = isMaxMonth ? maxDate.getDate() : maxDays;

      // Clamp Day
      if (day < minDayLimit) day = minDayLimit;
      if (day > maxDayLimit) day = Math.min(maxDayLimit, maxDays);
      if (day > maxDays) day = maxDays;

      const newDate = new Date(year, month - 1, day);
      
      if (onChange) {
        onChange(newDate);
      }
    },
    [pickerValue, minDate, maxDate, onChange]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        height: itemHeight * 5,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          zIndex: 1,
        }}
      >
        {columns.map((column, index) => (
          <Wheel
            key={index}
            index={index}
            column={column}
            value={pickerValue[index]}
            onSelect={handleSelect}
            itemHeight={itemHeight}
          />
        ))}
      </View>

      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)" }} />
        <View
          style={{
            height: itemHeight,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "rgba(51, 102, 255, 0.1)",
          }}
        />
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)" }} />
      </View>
    </View>
  );
};

export const DatePickerSidebar: React.FC<DatePickerSidebarProps> = ({
  mode,
  currentRange,
  onConfirm,
  onClose,
  showActionButtons = true,
  isFuture = undefined,
}) => {
  const { t } = useTranslation();

  // Helper tính min/max date chính xác
  const getMinDate = () => {
    const today = startOfDay(new Date());
    let limit: Date | undefined = undefined;

    if (mode === "end" && currentRange.startDate) {
      limit = startOfDay(new Date(currentRange.startDate));
    }

    if (isFuture === true) {
       // Nếu bắt buộc tương lai, min là today
       if (!limit || today > limit) {
         limit = today;
       }
    }
    return limit || new Date(1900, 0, 1);
  };

  const getMaxDate = () => {
    const today = endOfDay(new Date());
    let limit: Date | undefined = undefined;

    if (mode === "start" && currentRange.endDate) {
      limit = endOfDay(new Date(currentRange.endDate));
    }

    if (isFuture === false) {
      // Nếu bắt buộc quá khứ, max là today
      if (!limit || today < limit) {
        limit = today;
      }
    }
    return limit || new Date(2100, 0, 1);
  };

  // State khởi tạo 1 lần duy nhất khi Sidebar mount
  const [tempDate, setTempDate] = useState(() => {
    let initialRaw = mode === "start" ? currentRange.startDate : currentRange.endDate;
    
    // Safe check: Nếu initialRaw null/undefined hoặc Invalid Date
    let initial = initialRaw ? new Date(initialRaw) : new Date();
    if (isNaN(initial.getTime())) initial = new Date();

    const min = getMinDate();
    const max = getMaxDate();
    
    // Clamp initial value ngay từ đầu
    if (initial < min) return min;
    if (initial > max) return max;
    return initial;
  });

  const handleDateChange = useCallback((nextDate: Date) => {
    setTempDate(nextDate);
    if (!showActionButtons) {
      onConfirm(nextDate);
    }
  }, [showActionButtons, onConfirm]);

  const handleConfirm = () => {
    onConfirm(tempDate);
  };

  return (
    <View style={{ backgroundColor: "#fff", paddingBottom: 35 }}>
      <Layout style={{ padding: 16 }}>
        <DatePicker
          value={tempDate}
          onChange={handleDateChange}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
        />
        {showActionButtons && (
          <>
            <Button onPress={handleConfirm} style={{ marginTop: 24 }}>
              {t("common.action.confirm", { defaultValue: "Xác nhận" })}
            </Button>
          </>
        )}
      </Layout>
    </View>
  );
};