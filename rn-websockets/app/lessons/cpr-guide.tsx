import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import PagerView, { usePagerView } from "react-native-pager-view";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Page from "@/components/Page";
import YoutubePlayer from "react-native-youtube-iframe";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function CPRTypes() {
  const pagerView = useRef<PagerView>(null);

  return (
    <PagerView style={styles.pagerView} ref={pagerView}>
      <ScrollView key="1" style={styles.page}>
        <Page
          title="First Steps"
          text="When you suspect a sudden cardiac arrest, you should first check if the person is breathing, and whether they are conscious. If they are not breathing, call 911 on speaker, or ask someone nearby to, and, if they are conscious, ask for their consent to perform CPR (if not, you have consent by implied consent)¹. If someone is nearby, tell them to find an AED, and immediately begin CPR."
          imageSource={require("@/assets/images/phone.svg")}
        />
      </ScrollView>
      <ScrollView key="2" style={styles.page}>
        <Page
          title="Conducting CPR"
          text="As somebody who is performing CPR without formal training, you should use compression-only CPR. Not only is it easier to perform, adults have an equal or higher rate of survival². To conduct CPR, place the heel of one hand on the center of the person's chest, and put your other hand on top. Then, repeatedly press down into the victim's chest, at 2 inches of depth, to the tune of 'Stayin Alive.'"
          imageSource={require("@/assets/images/cpr.svg")}
        />
      </ScrollView>
      <ScrollView key="3" style={styles.page}>
        <Page
          title="CPR: By the Numbers"
          text="Effective CPR involves delivering chest compressions at a rate of 100 to 120 compressions per minute, with each compression reaching a depth of at least 2 inches. Maintaining proper rhythm and depth significantly increases the chances of survival during cardiac arrest."
          imageSource={require("@/assets/images/people.svg")}
        />
      </ScrollView>
      <ScrollView key="4" style={styles.page}>
        <View style={styles.videoContainer}>
          <View style={styles.videoWrapper}>
            <Text style={styles.videoTitle}>How to Perform Hands-Only CPR</Text>
            <Text style={styles.videoAuthor}>American Red Cross</Text>
            <YoutubePlayer
              height={220}
              play={false}
              videoId={"6eRwgM2Pa4o"}
              webViewStyle={styles.videoPlayer}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Demonstration Video</Text>
            <Text style={styles.description}>
              To solidify your understanding, watch this short video by the
              American Red Cross about how to perform Hands-Only CPR.
            </Text>
            <Text style={styles.description}>
              Pay special attention to the hand placement, and how the
              instructor checks on the person before performing CPR.
              Additionally, watch to see the key signs that you should stop
              giving compressions — such as when a trained responder is
              available.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View key="5" style={styles.page}>
        <View style={styles.conclusionContainer}>
          <View>
            <Text style={styles.conclusionTitle}>Conclusion</Text>
            <Text style={styles.conclusionText}>
              In an emergency where someone stops breathing, CPR is an
              invaluable tool that saves thousands of lives. Hands-only CPR is
              recommended because it is easier, and just as effective as
              traditional CPR. When you're performing CPR, expect to break the
              person's ribs, and do not stop until help arrives, or you
              physically can't keep going.
            </Text>
            <Text style={styles.conclusionText}>Great job! 🎉</Text>

            <View style={styles.citationsContainer}>
              <Text style={styles.citationsTitle}>Citations</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.redcross.org/content/dam/redcross/uncategorized/6/CPro_PM_digital.pdf"
                  )
                }
              >
                <Text style={styles.citation}>
                  1: American Red Cross CPR Guidelines
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://doi.org/10.1016/S0140-6736(10)61454-7"
                  )
                }
              >
                <Text style={styles.citation}>
                  2: Chest-Compression-Only Versus Standard Cardiopulmonary
                  Resuscitation: A Meta-Analysis
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button text="Complete" onPress={() => router.replace("/")} />
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
  videoContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  videoWrapper: {
    paddingHorizontal: 16,
    paddingTop: 20,
    borderRadius: 12,
    height: 300,
    overflow: "hidden",
    justifyContent: "center",
  },
  videoPlayer: {
    alignSelf: "stretch",
    borderRadius: 12,
    overflow: "hidden",
  },
  textContainer: {
    padding: 24,
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  videoTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  videoAuthor: {
    color: "#ef8228",
    marginTop: 8,
    marginBottom: 12,
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
    textDecorationLine: "underline",
  },
});
