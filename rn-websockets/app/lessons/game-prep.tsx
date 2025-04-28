import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView, { usePagerView } from "react-native-pager-view";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Page from "@/components/Page";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function GamePrepPage() {
  const pagerView = useRef<PagerView>(null);

  return (
    <PagerView style={styles.pagerView} ref={pagerView}>
      <ScrollView key="1" style={styles.page}>
        <Page
          title="Getting Prepared"
          text="Now you're ready to play the game! Applying your skills in a competition setting is a great way to practice your skills. Remember, this game is just practice, for fun! Be aware of your surroundings, and be aware of how tired you feel."
          imageSource={require("@/assets/images/cpr.svg")}
        />
      </ScrollView>
      <View key="2" style={styles.page}>
        <View style={styles.conclusionContainer}>
          <View>
            <Text style={styles.conclusionTitle}>Summary</Text>
            <Text style={styles.conclusionText}>
            As a reminder, place the heel of your hand in the center of the center of the devices, and push hard and fast, to the tune of stayin' alive. You've got this! Good luck!
            </Text>
          </View>
          <Button text="Complete" onPress={() => router.replace("/")}/>
        </View>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: "#1e2021",
  },
  page: {
    flex: 1,
  },
  conclusionContainer: {
    padding: 24,
    flex: 1,
    justifyContent: "space-between",
  },
  conclusionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  conclusionText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 32,
  },
  citationsContainer: {
    marginBottom: 32,
  },
  citationsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  citation: {
    color: "#ef8228",
    fontSize: 14,
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
});
