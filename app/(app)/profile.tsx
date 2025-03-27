import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const ProfileScreen = () => {
  // Sample user data
  const userData = {
    name: "Sara Santiago",
    username: "@saras",
    xp: 632,
    level: 4,
    achievements: [
      { name: "Consistency", icon: "fire", color: "#FF6347" },
      { name: "Top Performer", icon: "trophy", color: "#4CAF50" },
      { name: "Learner", icon: "book", color: "#2196F3" },
    ],
    recentActivity: [
      { date: "Mar 25", action: "Completed Level 4 Challenge", xp: "+50 XP" },
      { date: "Mar 24", action: "Daily Streak", xp: "+20 XP" },
      { date: "Mar 23", action: "Quiz Mastery", xp: "+40 XP" },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <MaterialIcons name="account-circle" size={80} color="white" />
        <Text style={styles.nameText}>{userData.name}</Text>
        <Text style={styles.usernameText}>{userData.username}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statSeparator} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.level}</Text>
            <Text style={styles.statLabel}>LEVEL</Text>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsRow}>
          {userData.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementIconContainer,
                  { backgroundColor: achievement.color },
                ]}
              >
                <FontAwesome name={achievement.icon} size={24} color="white" />
              </View>
              <Text style={styles.achievementText}>{achievement.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {userData.recentActivity.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityDetails}>
              <Text style={styles.activityDate}>{activity.date}</Text>
              <Text style={styles.activityAction}>{activity.action}</Text>
            </View>
            <Text style={styles.activityXP}>{activity.xp}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings" size={24} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Settings</Text>
        </TouchableOpacity>
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="log-out" size={24} color="#FF6347" />
            <Text style={styles.actionButtonText}>Logout</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
  nameText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  usernameText: {
    color: "white",
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 10,
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
  sectionContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  achievementsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  achievementItem: {
    alignItems: "center",
  },
  achievementIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 12,
    color: "#666",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  activityDetails: {
    flex: 1,
  },
  activityDate: {
    fontSize: 12,
    color: "#666",
  },
  activityAction: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activityXP: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 10,
    color: "#333",
  },
});

export default ProfileScreen;
