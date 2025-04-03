import LeaderboardCard from "@/components/LeaderboardCard";
import LessonCard from "@/components/LessonCard";
import UnitCard from "@/components/UnitCard";
import Feather from "@expo/vector-icons/Feather";
import { ReactElement, useContext } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserContext } from "@/context/UserContext";
import { Tabs } from "expo-router";

export default function HomeScreen() {
  const { users, setUsers } = useContext(UserContext);

  const resetScores = () => {
    setUsers([
      { name: "Matthew Xiong", score: 1092 },
      { name: "Jaylene Khourn", score: 851 },
      { name: "Anthony Xu", score: 705 },
      { name: "Renn Gilbert", score: 294 },
    ]);
  };

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={resetScores} style={{ padding: 16 }}>
              <Feather name="rotate-ccw" color="#fff" size={24} />
            </Pressable>
          ),
        }}
      />
      <View style={styles.page}>
        <FlatList
          data={users.sort((a, b) => a.score - b.score).reverse()}
          renderItem={({ item, index }) => {
            const { name, score } = item;
            return (
              <LeaderboardCard
                name={name}
                score={score}
                place={index + 1}
                key={index}
                highlighted={index <= 2}
              />
            );
          }}
          contentContainerStyle={styles.content}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#1e2021",
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
