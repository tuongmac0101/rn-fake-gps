import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { KitIcon, KitText } from '~/@ui-kit';
import { useTheme } from '@ui-kitten/components';

interface Props {
  value: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  disabledAction?: boolean;
}

export const QuantityInput: React.FC<Props> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 9999, 
  disabledAction = false 
}) => {
  const theme = useTheme();

  const decrease = () => {
    if (value > min) onChange && onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange && onChange(value + 1);
  };

  // Logic xử lý khi nhập từ bàn phím
  const handleChangeText = (text: string) => {
    if (!onChange) return;

    // 1. Nếu xóa hết chữ thì về min (hoặc 0)
    if (text === '') {
      onChange(min);
      return;
    }

    // 2. Chỉ lấy ký tự số
    const numericText = text.replace(/[^0-9]/g, '');
    let newValue = parseInt(numericText, 10);

    if (isNaN(newValue)) return;

    // 3. Logic chặn MAX: Nếu nhập quá max thì lấy max
    if (newValue > max) {
      newValue = max;
    }

    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      {disabledAction ? (
        <View style={[styles.valueBox, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
          <KitText style={styles.valueText}>{value}</KitText>
        </View>
      ) : (
        <>
          {/* Nút Trừ */}
          <TouchableOpacity onPress={decrease} style={[styles.btn, value <= min && styles.btnDisabled]}>
            <KitIcon name="minus-outline" size={20} color={value <= min ? "#ccc" : theme['text-basic-color']} />
          </TouchableOpacity>
          
          {/* Ô Nhập liệu (Thay thế Text bằng TextInput) */}
          <View style={styles.valueBox}>
            <TextInput
              style={[
                styles.input, 
                { color: theme['text-basic-color'] } // Lấy màu chữ theo theme
              ]}
              value={value.toString()}
              onChangeText={handleChangeText}
              keyboardType="number-pad" // Bàn phím số
              selectTextOnFocus={true} // Bấm vào là bôi đen số cũ để nhập nhanh hơn
              returnKeyType="done"
            />
          </View>
          
          {/* Nút Cộng */}
          <TouchableOpacity onPress={increase} style={[styles.btn, value >= max && styles.btnDisabled]}>
            <KitIcon name="plus-outline" size={20} color={value >= max ? "#ccc" : theme['text-basic-color']} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E4E9F2', 
    borderRadius: 8,
    alignSelf: 'flex-start' // Để container không bị stretch full width nếu không cần thiết
  },
  btn: { 
    padding: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: 40, // Cố định chiều rộng nút bấm cho cân đối
  },
  btnDisabled: { 
    opacity: 0.5 
  },
  valueBox: { 
    minWidth: 50, // Đổi từ width cố định sang minWidth để chứa số hàng nghìn
    paddingHorizontal: 8,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderColor: '#E4E9F2', 
    paddingVertical: 4 // Giảm padding dọc một chút để input vừa vặn
  },
  valueText: { 
    fontWeight: '600', 
    fontSize: 14 
  },
  input: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    padding: 0, // Bỏ padding mặc định của TextInput trên Android
    minWidth: 40
  }
});