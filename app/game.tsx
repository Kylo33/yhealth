import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";

const GameScreen: React.FC = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  // Sample CPR depth data (in mm)
  const depthData = [
    { value: 0, label: "0s" },
    { value: 25, label: "1s" },
    { value: 40, label: "2s" },
    { value: 52, label: "3s" },
    { value: 48, label: "4s" },
    { value: 55, label: "5s" },
    { value: 45, label: "6s" },
    { value: 38, label: "7s" },
    { value: 52, label: "8s" },
    { value: 58, label: "9s" },
    { value: 50, label: "10s" },
  ];

  // Sample frequency data (compressions per minute)
  const frequencyData = [
    { value: 0, label: "0s" },
    { value: 80, label: "1s" },
    { value: 95, label: "2s" },
    { value: 105, label: "3s" },
    { value: 115, label: "4s" },
    { value: 110, label: "5s" },
    { value: 105, label: "6s" },
    { value: 100, label: "7s" },
    { value: 98, label: "8s" },
    { value: 102, label: "9s" },
    { value: 108, label: "10s" },
  ];

  // Current score
  const currentScore = 82;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>CPR Training</Text>
          <Pressable onPress={() => setShowInstructionsModal(true)}>
            <View style={styles.helpBadge}>
              <Feather name="help-circle" size={18} color="white" />
              <Text style={styles.infoText}>Info</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView>
        {/* Points Container */}
        <View style={styles.pointsContainer}>
          <View style={styles.pointsCard}>
            <View style={styles.pointsRow}>
              <View style={styles.pointsItem}>
                <Text style={styles.pointsValue}>82</Text>
                <Text style={styles.pointsLabel}>Points</Text>
              </View>
              <View style={styles.pointsSeparator} />
              <View style={styles.pointsItem}>
                <Text style={styles.pointsValue}>10</Text>
                <Text style={styles.pointsLabel}>Seconds</Text>
              </View>
              <View style={styles.pointsSeparator} />
              <View style={styles.pointsItem}>
                <Text style={styles.pointsValue}>105</Text>
                <Text style={styles.pointsLabel}>Rate/min</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Compression Depth Chart - Blue */}
        <View style={styles.chartTopSpacer} />
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Compression Depth (mm)</Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={depthData}
              width={Dimensions.get("window").width - 60}
              height={200}
              yAxisLabel=""
              yAxisSuffix="mm"
              yAxisInterval={10}
              initialSpacing={0}
              color="#4169E1"
              thickness={3}
              hideRules
              noOfSections={5}
              maxValue={60}
              minValue={0}
              areaChart
              startFillColor="rgba(65, 105, 225, 0.2)"
              startOpacity={0.8}
              endFillColor="rgba(65, 105, 225, 0.01)"
              endOpacity={0}
              curved
              isAnimated
            />
          </View>
          <View style={styles.targetLineContainer}>
            <Text style={styles.targetLineText}>Target: 50-60mm</Text>
          </View>
        </View>

        {/* Frequency Chart - Red */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Compression Frequency (per min)</Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={frequencyData}
              width={Dimensions.get("window").width - 60}
              height={200}
              yAxisLabel=""
              yAxisSuffix="/min"
              yAxisInterval={20}
              initialSpacing={0}
              color="#DC143C"
              thickness={3}
              hideRules
              noOfSections={4}
              maxValue={120}
              minValue={0}
              areaChart
              startFillColor="rgba(220, 20, 60, 0.2)"
              startOpacity={0.8}
              endFillColor="rgba(220, 20, 60, 0.01)"
              endOpacity={0}
              curved
              isAnimated
            />
          </View>
          <View style={styles.targetLineContainer}>
            <Text style={styles.targetLineText}>Target: 100-120/min</Text>
          </View>
        </View>
      </ScrollView>

      {/* Instructions Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showInstructionsModal}
        onRequestClose={() => setShowInstructionsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>CPR Instructions</Text>

            <View style={styles.instructionModalItem}>
              <MaterialIcons name="touch-app" size={24} color="#4CAF50" />
              <Text style={styles.modalText}>
                Place hands on the center of the chest
              </Text>
            </View>

            <View style={styles.instructionModalItem}>
              <MaterialIcons name="speed" size={24} color="#4CAF50" />
              <Text style={styles.modalText}>
                Push hard and fast (100-120 compressions per minute)
              </Text>
            </View>

            <View style={styles.instructionModalItem}>
              <MaterialIcons name="replay" size={24} color="#4CAF50" />
              <Text style={styles.modalText}>
                Allow full chest recoil between compressions
              </Text>
            </View>

            <View style={styles.instructionModalItem}>
              <MaterialIcons name="straighten" size={24} color="#4CAF50" />
              <Text style={styles.modalText}>
                Compress 50-60mm deep for adults
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInstructionsModal(false)}
            >
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  // Header Styles
  headerBackground: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  helpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  infoText: {
    color: "white",
    fontSize: 18,
    marginLeft: 8,
  },
  // Points Container
  pointsContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  pointsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  pointsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
  pointsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pointsItem: {
    alignItems: "center",
    flex: 1,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  pointsLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  pointsSeparator: {
    width: 1,
    backgroundColor: "#EEE",
  },
  // Chart Styles
  chartTopSpacer: {
    height: 10,
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  targetLineContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  targetLineText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  instructionModalItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;
