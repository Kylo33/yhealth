import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ navigationBarColor: "#fff", headerShown: false }}>
      <Stack.Screen name="game" options={{ title: "CPR Accuracy Game" }} />
    </Stack>
  );
}
