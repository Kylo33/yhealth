import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type BirdHandle = {
  send: (message: string) => void;
};
type Props = {};

const Bird = forwardRef<BirdHandle, Props>((props, ref) => {
  const animation = useRef<LottieView>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    send(message: string) {
      setTimeout(() => {
        animation.current?.play();
      }, 0);
      setMessage(message);
      setTimeout(() => setMessage(undefined), 10000);
    },
  }));

  return (
    <View style={styles.overlay}>
      {message && (
        <>
          <Animated.View
            style={styles.birdContainer}
            entering={FadeInRight}
            exiting={FadeOutRight}
          >
            <LottieView
              style={styles.bird}
              ref={animation}
              source={require("@/assets/animations/parrot.json")}
              loop={false}
            />
          </Animated.View>
          <Animated.View
            style={styles.messageContainer}
            entering={FadeInRight}
            exiting={FadeOutRight}
          >
            <Text style={styles.messageText}>{message}</Text>
          </Animated.View>
        </>
      )}
    </View>
  );
});

export default Bird;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  },
  birdContainer: {
    position: "absolute",
    right: -80,
    bottom: -60,
    zIndex: 1,
  },
  bird: {
    height: 200,
    width: 200,
  },
  messageContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    maxWidth: 220,
    position: "absolute",
    right: 50,
    bottom: 50,
  },
  messageText: {
    fontSize: 18,
    color: "#858585",
  },
});
