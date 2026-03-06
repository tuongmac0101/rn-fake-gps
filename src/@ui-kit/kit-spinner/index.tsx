import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";

type Status = Omit<EvaStatus, "control" | "basic">;
export interface IKitSpinnerProps extends ActivityIndicatorProps {
  status?: Status;
}

export const KitSpinner = (props: IKitSpinnerProps) => {
  const theme = useTheme();
  const { color, status, ...restProps } = props;
  if (color) {
    return <ActivityIndicator {...restProps} color={color} />;
  }
  if (status) {
    const getColorStatus = (status: Status) => {
      switch (status) {
        case "success":
          return theme["color-success-default"];
        case "info":
          return theme["color-info-default"];
        case "warning":
          return theme["color-warning-default"];
        case "danger":
          return theme["color-danger-default"];
      }
      return theme["color-primary-default"];
    };
    const colorStatus = getColorStatus(status);
    return <ActivityIndicator {...restProps} color={colorStatus} />;
  }
  const spinnerColor = theme["color-primary-default"];
  return <ActivityIndicator {...restProps} color={spinnerColor} />;
};
