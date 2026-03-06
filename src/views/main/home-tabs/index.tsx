import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SavedRoutesScreen, HistoryScreen } from "~/screens";
import { Map, Bookmark, History } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e2e8f0",
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Bản đồ",
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedRoutes"
        component={SavedRoutesScreen}
        options={{
          title: "Đã lưu",
          tabBarIcon: ({ color, size }) => (
            <Bookmark size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Lịch sử",
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
