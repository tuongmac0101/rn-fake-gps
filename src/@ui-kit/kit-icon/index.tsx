// Check ICON https://akveo.github.io/eva-icons/#/
import { Icon, IconProps } from "@ui-kitten/components";
import { StyleProp, ImageStyle } from "react-native";
import { KitIconName } from "./types";
import { useTheme } from "@ui-kitten/components";

export interface IKitIconProps extends Omit<IconProps<{}>, "fill"> {
  name: KitIconName;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export const KitIcon = (props: IKitIconProps) => {
  const { size, style = {}, color, name, ...rest } = props;
  const theme = useTheme();
  return (
    <Icon
      {...rest}
      style={{ width: size, height: size, ...(style as any) }}
      fill={color || theme["color-primary-default"]}
      name={name}
    />
  );
};
