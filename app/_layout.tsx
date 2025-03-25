import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ navigationBarColor: "#fff", headerShown: false }} />
  );
}
