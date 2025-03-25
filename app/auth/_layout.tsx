import { app } from "@/firebase";
import { Redirect, Stack } from "expo-router";
import { getAuth } from "firebase/auth";

export default function AuthLayout() {
  if (getAuth(app).currentUser) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ navigationBarColor: "#fff" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="reset-password"
        options={{ title: "Password Reset" }}
      />
    </Stack>
  );
}
