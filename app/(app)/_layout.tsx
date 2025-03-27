import { app } from "@/firebase";
import Feather from "@expo/vector-icons/Feather";
import { Redirect, Tabs } from "expo-router";
import { getAuth } from "firebase/auth";
import React from "react";

export default function AppLayout() {
  if (!getAuth(app).currentUser) {
    return <Redirect href="/auth/(tabs)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarLabel: "Board",
          tabBarIcon: ({ size, color }) => (
            <Feather name="award" size={size} color={color} />
          ),
          title: "Leaderboard",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
