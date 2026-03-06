import { useTheme } from "@ui-kitten/components";

export const useCachedTheme = () => {
  const theme = useTheme();
  return {
    theme: {
      primary: theme["color-primary-500"],
      white: theme["color-basic-100"],
      hint: theme["text-hint-color"],
      black: theme["text-basic-color"],
      gray: "#999",
      lightGray: "#eee",
      warning: "#f0b400",
      border: "#ccc",
    },
  };
};
