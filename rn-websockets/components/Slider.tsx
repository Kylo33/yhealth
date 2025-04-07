import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Easing,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Slider({
  onComplete,
  text,
}: {
  onComplete: () => void;
  text: string;
}) {
  const offset = useSharedValue(0);
  const MAX_VALUE = 209;

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value =
        Math.abs(offset.value) <= MAX_VALUE
          ? offset.value + event.changeX <= 0
            ? 0
            : offset.value + event.changeX >= MAX_VALUE
            ? MAX_VALUE
            : offset.value + event.changeX
          : offset.value;
    })
    .onEnd(() => {
      if (Math.abs(offset.value - MAX_VALUE) <= 5) {
        runOnJS(onComplete)();
      }
      offset.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.slider, sliderStyle]}>
          <Feather name="chevron-right" size={24} color="#fff" />
        </Animated.View>
      </GestureDetector>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#343637",
    padding: 8,
    borderRadius: 8,
    height: 48,
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    backgroundColor: "#ef8228",
    aspectRatio: 1.5,
    borderRadius: 8,
    height: 48,
    position: "absolute",
    left: 0,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  labelText: {
    fontSize: 18,
    color: "#85858588",
  },
});
