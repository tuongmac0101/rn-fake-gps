import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabView } from "./home";
import { ProfileTabView } from "./profile";
import { OrderManagementTabView } from "./order-management";
import { ApprovalOrderTabView } from "./approval-order";
import { KitIcon } from "~/@ui-kit/kit-icon";
import { useTranslation } from "react-i18next";
import React from "react";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="HomeTabView"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTabView"
        component={HomeTabView}
        options={{
          title: t("common.homeTabs.home.title"),
          tabBarIcon: ({ color, size }) => (
            <KitIcon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderManagementTabView"
        component={OrderManagementTabView}
        options={{
          title: t("common.homeTabs.orderManagement.title"),
          tabBarIcon: ({ color, size }) => (
            <KitIcon name="shopping-cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ApprovalOrderTabView"
        component={ApprovalOrderTabView}
        options={{
          title: t("common.homeTabs.approvalOrder.title"),
          tabBarIcon: ({ color, size }) => (
            <KitIcon name="plus-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTabView"
        component={ProfileTabView}
        options={{
          title: t("common.homeTabs.profile.title"),
          tabBarIcon: ({ color, size }) => (
            <KitIcon
              name="person-outline"
              style={{
                width: size,
                height: size,
              }}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
