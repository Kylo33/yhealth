import { StyleSheet, Text, View } from "react-native";
import PagerView, { usePagerView } from "react-native-pager-view";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Page from "@/components/Page";

export default function CPRTypes() {
  const pagerView = useRef<PagerView>(null);

  return (
    <PagerView style={styles.pagerView} ref={pagerView}>
      <ScrollView key="1" style={styles.page}>
        <Page
          title="First Steps"
          text="When you suspect a suddent cardiac arrest, you should first check if the person is breathing, and whether they are conscious. If they are not breathing, immediately call 911 (on speaker), and, if they are conscious, ask for their consent to perform CPR (if not, you have consent by implied consent). If someone is nearby, tell them to find an AED, and immediately begin CPR."
          imageSource={require("@/assets/images/phone.svg")}
        />
      </ScrollView>
      <ScrollView key="2" style={styles.page}>
        <Page
          title="Conducting CPR"
          text="As somebody who is performing CPR without formal training, you should use compression-only CPR. Not only is it easier to perform, adults have an equal or higher rate of survival. To conduct CPR, place the heel of one hand on the center of the person’s chest, and put your other hand on top. Then, repeatedly press down into the victim’s chest, at 2 inches of depth, to the tune of ‘Stayin Alive.’"
          imageSource={require("@/assets/images/cpr.svg")}
        />
      </ScrollView>
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
});
