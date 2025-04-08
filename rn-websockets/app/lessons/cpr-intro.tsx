import { StyleSheet, Text, View } from "react-native";
import PagerView, { usePagerView } from "react-native-pager-view";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Page from "@/components/Page";

export default function Intro() {
  const pagerView = useRef<PagerView>(null);

  return (
    <PagerView style={styles.pagerView} ref={pagerView}>
      <ScrollView key="1" style={styles.page}>
        <Page
          title="What is CPR?"
          text="CPR, or cardiopulmonary resuscitation, is a technique used during emergencies, often by bystanders, to restore a person’s breathing and blood circulation. The technique consists of chest compressions and, sometimes, mouth-to-mouth contact as a form of artificial breathing."
          imageSource={require("@/assets/images/cpr.svg")}
        />
      </ScrollView>
      <ScrollView key="2" style={styles.page}>
        <Page
          title="Why is CPR important?"
          text="According to the American Heart Association, over 350,000 heart attacks occur outside of hospitals each year in the United States. In these situations, performing CPR can double, or even triple, a person’s chance of survival, yet bystanders only perform CPR 46% of the time — meaning there are thousands of lives needlessly lost every year."
          imageSource={require("@/assets/images/people.svg")}
        />
      </ScrollView>
      <ScrollView key="3" style={styles.page}>
        <Page
          title="CPR vs. AED"
          text="A defibrillator (AED) is a machine that produces electric shocks that can restore the normal heart function of the victim. In an emergency where a person’s heart stops, both CPR and a defibrillator can be used to save the person, though a defibrillator should be used first if it is accessible. Typically, an AED will indicate when CPR should be conducted."
          imageSource={require("@/assets/images/heart.svg")}
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
