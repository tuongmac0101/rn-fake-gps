import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';

const grid = 4;
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  textCornerWrap: {
    overflow: 'hidden',
  },
  dot: {
    width: 2 * grid,
    height: 2 * grid,
    borderRadius: grid,
    backgroundColor: '#ff5b05',
    position: 'absolute',
    top: -1 * grid,
    right: -1 * grid,
    zIndex: 10,
  },
  dotSizelarge: {
    width: 4 * grid,
    height: 4 * grid,
    borderRadius: 2 * grid,
  },
  textDom: {
    paddingVertical: 0.5 * grid,
    paddingHorizontal: (Platform.OS === 'ios' ? 1.5 : 2) * grid,
    backgroundColor: '#ff5b05',
    borderRadius: 4 * 2,
    position: 'absolute',
    top: -10,
    right: -15,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDomlarge: {
    paddingVertical: 1 * grid,
    paddingHorizontal: 3 * grid,
  },
  textCorner: {
    width: 18 * grid,
    backgroundColor: '#ff5b05',
    transform: [
      {
        rotate: '45deg',
      },
    ],
    position: 'absolute',
    top: 2 * grid,
    right: -2 * grid,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCornerlarge: {
    width: 26 * grid,
    top: 3 * grid,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export interface BadgeProps {
  style?: StyleProp<ViewStyle>;
  size?: 'large' | 'small';
  overflowCount?: number;
  corner?: boolean;
  dot?: boolean;
  text?: string | number;
  children?: React.ReactNode;
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    size: 'small',
    overflowCount: 99,
    dot: false,
    corner: false,
  };

  render() {
    let {
      style,
      children,
      text,
      size,
      overflowCount,
      dot,
      corner,
      ...restProps
    } = this.props;
    const displayText =
      typeof text === 'number' && text > (overflowCount as number)
        ? `${overflowCount}+`
        : text;
    if (dot) {
      text = '';
    }
    const badgeCls = corner ? 'textCorner' : 'textDom';
    const baseStyle = styles[badgeCls];
    const sizeStyleKey = `${badgeCls}${size}` as keyof typeof styles;
    const sizeStyle = styles[sizeStyleKey] as ViewStyle;
    const contentDom = dot ? (
      <View
        {...restProps}
        style={[
          styles.dot,
          size === 'large' && styles.dotSizelarge,
          style,
        ]}
      />
    ) : (
      <View
        {...restProps}
        style={[
          baseStyle,
          sizeStyle,
          style,
        ]}
      >
        <Text style={[styles.text]}>{displayText}</Text>
      </View>
    );
    if (!children) {
        return (
             <View {...restProps} style={[style, !dot && baseStyle, !dot && sizeStyle, dot && styles.dot]}>
                {!dot && <Text style={[styles.text]}>{displayText}</Text>}
             </View>
        )
    }
    return (
      <View style={[styles.wrap]}>
        <View style={[corner && styles.textCornerWrap]}>
          {children}
          {(text || dot) ? contentDom : null}
        </View>
      </View>
    );
  }
}