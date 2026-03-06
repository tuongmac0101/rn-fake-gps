import React from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useTheme } from "@ui-kitten/components";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";
import { StyleSheet } from "react-native";

export interface KitBottomSheetInputProps extends BottomSheetTextInputProps {}

export const KitBottomSheetInput = ({ ...props }: KitBottomSheetInputProps) => {
  const theme = useTheme();

  const { style, ...restProps } = props;

  return (
    <BottomSheetTextInput
    
      {...restProps}
      placeholderTextColor={theme["text-hint-color"]}
      style={[
        styles.input,
        {
          backgroundColor: theme["background-basic-color-2"],
          borderColor: theme["border-basic-color-3"],
          color: theme["text-basic-color"],
        },
        style,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 6,
    color: "#222B45", // màu chữ giống UI Kitten10001
    backgroundColor: "#F7F9FC", // nền giống UI Kitten light theme
    borderColor: "#E4E9F2",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
});
