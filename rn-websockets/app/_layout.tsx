import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserContext } from "@/context/UserContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Modal from "@/components/Modal";
import Disclaimer from "@/components/Disclaimer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [disclaimerVisible, setDisclaimerVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchAsyncData = async () => {
      const users: string = (await AsyncStorage.getItem("users")) || "[]";
      setUsers(JSON.parse(users));

      const currentUser: string | undefined =
        (await AsyncStorage.getItem("currentUser")) || undefined;
      setCurrentUser(currentUser);
    };

    fetchAsyncData();
  }, []);

  useEffect(() => {
    const updateLocalData = async () => {
      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("currentUser", currentUser || "");
    };

    updateLocalData();
  }, [users, currentUser]);

  return (
    <GestureHandlerRootView>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <UserContext.Provider value={{ users, setUsers }}>
          <View style={{ flex: 1, backgroundColor: "#1e2021" }}>
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
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="lessons" options={{ headerShown: false }} />
              <Stack.Screen
                name="game"
                options={{ title: "CPR Practice Game" }}
              />
            </Stack>
          </View>
          <Disclaimer
            visible={disclaimerVisible}
            onAccept={() => setDisclaimerVisible(false)}
          />
        </UserContext.Provider>
      </CurrentUserContext.Provider>
    </GestureHandlerRootView>
  );
}
