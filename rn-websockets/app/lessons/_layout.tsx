import { Stack } from "expo-router";

export default function LessonLayout() {
  return (
    <Stack
      screenOptions={{
        navigationBarColor: "#1e2021",
        statusBarBackgroundColor: "#1e2021",
        headerStyle: {
          backgroundColor: "#1e2021",
        },
        headerTitleStyle: {
          color: "#fff",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="cpr-intro"
        options={{ title: "Introduction to CPR" }}
      />
      <Stack.Screen name="cpr-guide" options={{ title: "CPR Guide" }} />
      <Stack.Screen
        name="game-prep"
        options={{ title: "CPR Game Preparation" }}
      />
    </Stack>
  );
}
