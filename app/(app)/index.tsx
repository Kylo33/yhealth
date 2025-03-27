import Button from "@/components/Button";
import { auth } from "@/firebase";
import { Link, router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { CircularProgress } from "react-native-circular-progress";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Active Unit Card */}
        <View style={styles.unitCard}>
          <Text style={styles.unitTitle}>Unit 1: Emergency Response</Text>
          <Text style={styles.unitSubtitle}>
            Learn life-saving first aid techniques
          </Text>
          {/* Learning Path Items */}
          <TouchableOpacity style={styles.pathItem}>
            <Feather name="heart" size={24} color="#4CAF50" />
            <View style={styles.pathTextContainer}>
              <Text style={styles.pathTitle}>CPR Basics</Text>
              <Text style={styles.pathSubtitle}>Cardiac arrest response</Text>
            </View>
            <CircularProgress
              size={40}
              width={3}
              fill={0}
              tintColor="#4CAF50"
              backgroundColor="#e0e0e0"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pathItem}>
            <Feather name="wind" size={24} color="#4CAF50" />
            <View style={styles.pathTextContainer}>
              <Text style={styles.pathTitle}>Breathing Emergency</Text>
              <Text style={styles.pathSubtitle}>Choking and airways</Text>
            </View>
            <CircularProgress
              size={40}
              width={3}
              fill={0}
              tintColor="#4CAF50"
              backgroundColor="#e0e0e0"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pathItem}>
            <Feather name="plus" size={24} color="#4CAF50" />
            <View style={styles.pathTextContainer}>
              <Text style={styles.pathTitle}>Wound Care</Text>
              <Text style={styles.pathSubtitle}>Basic wound treatment</Text>
            </View>
            <CircularProgress
              size={40}
              width={3}
              fill={0}
              tintColor="#4CAF50"
              backgroundColor="#e0e0e0"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pathItem}
            onPressOut={() => router.push("/game")}
          >
            <Feather name="mouse-pointer" size={24} color="#4CAF50" />
            <View style={styles.pathTextContainer}>
              <Text style={styles.pathTitle}>CPR Accuracy Game</Text>
              <Text style={styles.pathSubtitle}>Hands-on practice</Text>
            </View>
            <CircularProgress
              size={40}
              width={3}
              fill={0}
              tintColor="#4CAF50"
              backgroundColor="#e0e0e0"
            />
          </TouchableOpacity>

          {/* Start Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push("/lesson")}
          >
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        </View>

        {/* Rest of the code remains the same */}
        {/* Second Disabled Unit Card */}
        <View style={[styles.unitCard, styles.disabledUnitCard]}>
          <View style={styles.lockIconContainer}>
            <MaterialIcons name="lock" size={24} color="#9E9E9E" />
          </View>
          <Text style={[styles.unitTitle, styles.disabledText]}>
            Unit 2: Medical Management
          </Text>
          <Text style={[styles.unitSubtitle, styles.disabledText]}>
            Advanced medical care techniques
          </Text>
          {/* Disabled Learning Path Items */}
          {[
            {
              icon: "thermometer",
              title: "Vital Signs",
              description: "Monitoring patient health",
            },
            {
              icon: "activity",
              title: "Patient Assessment",
              description: "Comprehensive evaluation",
            },
            {
              icon: "droplet",
              title: "Medication",
              description: "Administration basics",
            },
            {
              icon: "clipboard",
              title: "Medical Records",
              description: "Documentation skills",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[styles.pathItem, styles.disabledPathItem]}
            >
              <Feather name={item.icon as any} size={24} color="#9E9E9E" />
              <View style={styles.pathTextContainer}>
                <Text style={[styles.pathTitle, styles.disabledText]}>
                  {item.title}
                </Text>
                <Text style={[styles.pathSubtitle, styles.disabledSubtitle]}>
                  {item.description}
                </Text>
              </View>
              <MaterialIcons name="lock" size={24} color="#9E9E9E" />
            </View>
          ))}
          {/* Disabled Start Button */}
          <View style={[styles.startButton, styles.disabledStartButton]}>
            <Text style={[styles.startButtonText, styles.disabledText]}>
              LOCKED
            </Text>
          </View>
        </View>

        {/* Third Disabled Unit Card with Unique Content */}
        <View style={[styles.unitCard, styles.disabledUnitCard]}>
          <View style={styles.lockIconContainer}>
            <MaterialIcons name="lock" size={24} color="#9E9E9E" />
          </View>
          <Text style={[styles.unitTitle, styles.disabledText]}>
            Unit 3: Emergency Equipment
          </Text>
          <Text style={[styles.unitSubtitle, styles.disabledText]}>
            Understanding medical and rescue tools
          </Text>
          {/* Disabled Learning Path Items */}
          {[
            {
              icon: "tool",
              title: "First Aid Kit",
              description: "Components and usage",
            },
            {
              icon: "umbrella",
              title: "Safety Equipment",
              description: "Protective gear essentials",
            },
            {
              icon: "navigation",
              title: "Navigation Tools",
              description: "Rescue and orientation",
            },
            {
              icon: "anchor",
              title: "Emergency Devices",
              description: "Communication and signaling",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[styles.pathItem, styles.disabledPathItem]}
            >
              <Feather name={item.icon as any} size={24} color="#9E9E9E" />
              <View style={styles.pathTextContainer}>
                <Text style={[styles.pathTitle, styles.disabledText]}>
                  {item.title}
                </Text>
                <Text style={[styles.pathSubtitle, styles.disabledSubtitle]}>
                  {item.description}
                </Text>
              </View>
              <MaterialIcons name="lock" size={24} color="#9E9E9E" />
            </View>
          ))}
          {/* Disabled Start Button */}
          <View style={[styles.startButton, styles.disabledStartButton]}>
            <Text style={[styles.startButtonText, styles.disabledText]}>
              LOCKED
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 16,
  },
  unitCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  disabledUnitCard: {
    backgroundColor: "#F5F5F5",
  },
  heavilyDisabledUnitCard: {
    backgroundColor: "#FAFAFA",
  },
  unitTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a237e",
  },
  unitSubtitle: {
    fontSize: 16,
    color: "#616161",
    marginBottom: 20,
  },
  pathItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  disabledPathItem: {
    borderBottomColor: "#E0E0E0",
  },
  heavilyDisabledPathItem: {
    borderBottomColor: "#F5F5F5",
  },
  pathTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  pathSubtitle: {
    fontSize: 14,
    color: "#9e9e9e",
  },
  disabledSubtitle: {
    color: "#BDBDBD",
  },
  heavilyDisabledSubtitle: {
    color: "#E0E0E0",
  },
  disabledText: {
    color: "#9E9E9E",
  },
  heavilyDisabledText: {
    color: "#BDBDBD",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  disabledStartButton: {
    backgroundColor: "#E0E0E0",
  },
  heavilyDisabledStartButton: {
    backgroundColor: "#F5F5F5",
  },
  lockIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  loginLink: {
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 16,
  },
});
