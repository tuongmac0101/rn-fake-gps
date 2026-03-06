import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Layout, Text, Icon } from "@ui-kitten/components";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

type Key = string | number;

type CollapseProps = {
  children: React.ReactNode;
  /** If true, only one panel can be expanded at a time */
  accordion?: boolean;
  /** Controlled active key(s) */
  activeKey?: Key | Key[];
  /** Initial active key(s) in uncontrolled mode */
  defaultActiveKey?: Key | Key[];
  /** Trigger when active panel(s) change */
  onChange?: (activeKey: Key | Key[] | null) => void;
  /** Show border around collapse */
  bordered?: boolean;
  /** Transparent style (no background / border) */
  ghost?: boolean;
  /** Custom expand icon renderer */
  expandIcon?: (opts: { isActive: boolean }) => React.ReactNode;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
};

type PanelProps = {
  /** Unique key of this panel (AntD: key, here: panelKey to avoid React key conflict) */
  panelKey: Key;
  /** Header node */
  header: React.ReactNode;
  /** Panel content */
  children: React.ReactNode;
  /** Extra node on the right side of header */
  extra?: React.ReactNode;
  /** Disable toggle */
  disabled?: boolean;
  /** Show arrow icon */
  showArrow?: boolean;
};

type CollapseContextValue = {
  activeKeys: Key[];
  toggle: (key: Key, disabled?: boolean) => void;
  expandIcon?: (opts: { isActive: boolean }) => React.ReactNode;
};

const CollapseContext = createContext<CollapseContextValue | null>(null);

const toArray = (value?: Key | Key[]): Key[] => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

export const KitCollapse: React.FC<CollapseProps> & {
  Panel: React.FC<PanelProps>;
} = ({
  children,
  accordion = false,
  activeKey,
  defaultActiveKey,
  onChange,
  bordered = true,
  ghost = false,
  expandIcon,
  style,
}) => {
  const isControlled = activeKey !== undefined;

  const [innerActiveKeys, setInnerActiveKeys] = useState<Key[]>(() =>
    toArray(defaultActiveKey)
  );

  const currentActiveKeys = isControlled ? toArray(activeKey) : innerActiveKeys;

  const toggle = useCallback(
    (key: Key, disabled?: boolean) => {
      if (disabled) return;

      const list = currentActiveKeys;
      const index = list.indexOf(key);
      let next: Key[];

      if (accordion) {
        next = index === -1 ? [key] : [];
      } else {
        next = index === -1 ? [...list, key] : list.filter((k) => k !== key);
      }

      if (!isControlled) {
        setInnerActiveKeys(next);
      }

      if (onChange) {
        if (accordion) {
          onChange(next[0] ?? null);
        } else {
          onChange(next);
        }
      }
    },
    [accordion, currentActiveKeys, isControlled, onChange]
  );

  const ctxValue = useMemo(
    () => ({
      activeKeys: currentActiveKeys,
      toggle,
      expandIcon,
    }),
    [currentActiveKeys, toggle, expandIcon]
  );

  return (
    <Layout
      level={ghost ? "1" : "2"}
      style={[styles.collapse, bordered && !ghost && styles.bordered, style]}
    >
      <CollapseContext.Provider value={ctxValue}>
        {children}
      </CollapseContext.Provider>
    </Layout>
  );
};

const PanelBase: React.FC<PanelProps> = ({
  panelKey,
  header,
  children,
  extra,
  disabled,
  showArrow = true,
}) => {
  const ctx = useContext(CollapseContext);

  if (!ctx) {
    console.warn("KitCollapse.Panel must be used inside KitCollapse.");
    return null;
  }

  const { activeKeys, toggle, expandIcon } = ctx;
  const isActive = activeKeys.includes(panelKey);

  const renderIcon = () => {
    if (!showArrow) return null;
    if (expandIcon) return expandIcon({ isActive });

    return (
      <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
        <Icon name="chevron-right-outline" style={styles.icon} fill="#8F9BB3" />
      </View>
    );
  };

  return (
    <View style={styles.panelWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggle(panelKey, disabled)}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          {renderIcon()}
          {typeof header === "string" ? (
            <Text category="s1">{header}</Text>
          ) : (
            header
          )}
        </View>
        {extra && <View style={styles.extra}>{extra}</View>}
      </TouchableOpacity>

      {isActive && <View style={styles.content}>{children}</View>}
    </View>
  );
};

KitCollapse.Panel = PanelBase;

const styles = StyleSheet.create({
  collapse: {
    borderRadius: 8,
    overflow: "hidden",
  },
  bordered: {
    borderWidth: 1,
    borderColor: "#E4E9F2",
  },
  panelWrapper: {
    borderTopWidth: 1,
    borderTopColor: "#E4E9F2",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconWrapper: {
    marginRight: 8,
    transform: [{ rotate: "0deg" }],
  },
  iconWrapperActive: {
    transform: [{ rotate: "90deg" }],
  },
  icon: {
    width: 18,
    height: 18,
  },
  extra: {
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
