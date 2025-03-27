import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Leaderboard data type
type LeaderboardEntry = {
  name: string;
  xp: number;
  rank: number;
};

// Sample leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  { name: "Sara S.", xp: 632, rank: 1 },
  { name: "John D.", xp: 322, rank: 2 },
  { name: "Sam P.", xp: 244, rank: 3 },
  { name: "Emma W.", xp: 180, rank: 4 },
  { name: "Jay V.", xp: 12, rank: 5 },
];

// Color mapping for ranks
const getRankColor = (rank: number) => {
  const colors = [
    "#FFA500", // 1st - Orange
    "#4169E1", // 2nd - Royal Blue
    "#DC143C", // 3rd - Crimson
    "#808080", // 4th - Gray
    "#A9A9A9", // 5th - Dark Gray
  ];
  return colors[rank - 1] || "#A9A9A9";
};

const LeaderboardScreen: React.FC = () => {
  // Calculate total XP and average XP
  const totalXP = leaderboardData.reduce((sum, entry) => sum + entry.xp, 0);
  const averageXP = Math.round(totalXP / leaderboardData.length);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerBackground}>
        <MaterialIcons name="emoji-events" size={50} color="white" />
        <Text style={styles.headerText}>Weekly Leaderboard</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{leaderboardData.length}</Text>
            <Text style={styles.statLabel}>PARTICIPANTS</Text>
          </View>
          <View style={styles.statSeparator} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{averageXP}</Text>
            <Text style={styles.statLabel}>AVG XP</Text>
          </View>
        </View>
      </View>

      {/* Leaderboard List */}
      <ScrollView style={styles.leaderboardList}>
        {leaderboardData.map((entry) => (
          <View
            key={entry.rank}
            style={[
              styles.leaderboardItem,
              { backgroundColor: getRankColor(entry.rank) },
            ]}
          >
            <View style={styles.rankCircle}>
              <Text style={styles.rankCircleText}>{entry.rank}</Text>
            </View>
            <View style={styles.leaderboardItemContent}>
              <Text style={styles.nameText}>{entry.name}</Text>
              <Text style={styles.xpText}>{entry.xp} xp this week</Text>
            </View>
            {entry.rank === 1 && (
              <Ionicons name="trophy" size={30} color="white" />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  headerBackground: {
    backgroundColor: "#4CAF50",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: "white",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 5,
  },
  statSeparator: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  leaderboardList: {
    paddingTop: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  rankCircleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  leaderboardItemContent: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  xpText: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
});

export default LeaderboardScreen;
