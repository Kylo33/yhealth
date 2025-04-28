import LessonCard from "@/components/LessonCard";
import UnitCard from "@/components/UnitCard";
import Feather from "@expo/vector-icons/Feather";
import { ReactElement } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <UnitCard title="Unit 1: CPR">
          <LessonCard
            title="Introduction"
            href="/lessons/cpr-intro"
            description="Introduction to CPR"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="heart" />
            )}
            color="#ef8228"
          />
          <LessonCard
            title="CPR Guide"
            href="/lessons/cpr-guide"
            description="How to perform CPR"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="activity" />
            )}
            color="#ef8228"
          />
          <LessonCard
            title="Preparation"
            href="/lessons/game-prep"
            description="Learn to play CPR Game"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="mouse-pointer" />
            )}
            color="#ef8228"
          />
          <LessonCard
            title="Game Time"
            href="/game"
            description="Hands-on CPR Practice"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="target" />
            )}
            color="#ef8228"
          />
        </UnitCard>
        <UnitCard title="Unit 2: CPR">
          <LessonCard
            title="Introduction"
            href="/lessons/cpr-intro"
            description="Coming soon"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="heart" />
            )}
            color="#343637"
            disabled={true}
          />
          <LessonCard
            title="CPR Types"
            href="/lessons/cpr-guide"
            description="Coming soon"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="activity" />
            )}
            color="#343637"
            disabled={true}
          />
          <LessonCard
            title="Preparation"
            href="/lessons/game-prep"
            description="Coming soon"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="mouse-pointer" />
            )}
            color="#343637"
            disabled={true}
          />
          <LessonCard
            title="Game Time"
            href="/game"
            description="Coming soon"
            icon={({ color, size }) => (
              <Feather size={size} color={color} name="target" />
            )}
            color="#343637"
            disabled={true}
          />
        </UnitCard>
      </ScrollView>
    </View>
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
