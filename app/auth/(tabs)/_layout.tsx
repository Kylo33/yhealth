import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function AuthTabs() {
  return (
    <Tabs screenOptions={{ lazy: false }}>
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => {
            return <Feather color={color} size={size} name="log-in" />;
          },
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, size }) => {
            return <Feather color={color} size={size} name="user-plus" />;
          },
        }}
      />
    </Tabs>
  );
}
