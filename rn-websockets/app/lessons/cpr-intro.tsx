import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView, { usePagerView } from "react-native-pager-view";
import { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Page from "@/components/Page";
import Button from "@/components/Button";
import { router } from "expo-router";

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
          text="According to the American Heart Association, over 350,000 heart attacks occur outside of hospitals each year in the United States. In these situations, performing CPR can double, or even triple, a person’s chance of survival, yet bystanders only perform CPR 46% of the time — meaning there are thousands of lives needlessly lost every year¹."
          imageSource={require("@/assets/images/people.svg")}
        />
      </ScrollView>
      <ScrollView key="3" style={styles.page}>
        <Page
          title="CPR vs. AED"
          text="A defibrillator (AED) is a machine that produces electric shocks that can restore the normal heart function of the victim. In an emergency where a person’s heart stops, both CPR and a defibrillator can be used to save the person. You should begin CPR immediately, while someone nearby gets an AED. When the AED is available, use it immediately — it will instruct you when to perform CPR²."
          imageSource={require("@/assets/images/heart.svg")}
        />
      </ScrollView>
      <View key="4" style={styles.page}>
        <View style={styles.conclusionContainer}>
          <View>
            <Text style={styles.conclusionTitle}>Summary</Text>
            <Text style={styles.conclusionText}>
              Great job completing your first lesson!
            </Text>   
            <Text style={styles.conclusionText}>
              As you have learned, CPR is an important skill — one that is not as common as it should be.
              Defibrillators are also excellent tools for responding to emergencies, and CPR can buy you
              time until an AED is available.
            </Text>          
            <View style={styles.citationsContainer}>
              <Text style={styles.citationsTitle}>Citations</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://cpr.heart.org/-/media/CPR-Files/Resources/Bystander-CPR/Bystander-CPR-Infographic.pdf')}>
                <Text style={styles.citation}>1: American Heart Association Bystander CPR Infographic</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://public.ksc.nasa.gov/aed/aed-faqs/')}>
                <Text style={styles.citation}>2: Kennedy Space Center AED FAQs — NASA</Text>
              </TouchableOpacity>
            </View>
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
