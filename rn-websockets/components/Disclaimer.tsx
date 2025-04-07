import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { PropsWithChildren, useRef } from "react";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Slider from "./Slider";
import * as Haptics from "expo-haptics";

type Props = PropsWithChildren<{
  visible: boolean;
  onAccept: () => void;
}>;

export default function Modal({ visible, onAccept }: Props) {
  const backgroundPressable = useRef(null);
  return (
    <>
      {visible && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.page}>
          <View style={styles.container}>
            <Text style={styles.title}>Disclaimer</Text>
            <View style={styles.divider} />
            <View style={styles.disclaimerContainer}>
              <Text style={styles.disclaimerText}>
                This app is not a substitute for professional healthcare,
                diagnosis, or treatment.
              </Text>
              <Text style={styles.disclaimerText}>
                Always consult with a qualified healthcare provider for any
                health concerns or before making any decisions related to your
                health or treatment.
              </Text>
            </View>
            <Slider
              onComplete={() => {
                onAccept();
                Haptics.impactAsync();
              }}
              text="Accept"
            />
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: "absolute",
    inset: 0,
  },
  page: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 100,
  },
  container: {
    backgroundColor: "#2e2f30",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  divider: {
    backgroundColor: "#85858588",
    height: 1,
  },
  title: {
    color: "#858585",
    fontWeight: "bold",
    fontSize: 18,
  },
  disclaimerContainer: {
    gap: 4,
  },
  disclaimerText: {
    color: "#85858588",
    fontSize: 18,
    lineHeight: 18 * 1.25,
  },
});
