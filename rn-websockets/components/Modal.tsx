import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { PropsWithChildren, useRef } from "react";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = PropsWithChildren<{
  visible: boolean;
  title: string;
  buttonText: string;
  onDismiss?: () => void;
  onSubmit: () => void;
}>;

export default function Modal({
  title,
  buttonText,
  visible,
  onDismiss,
  onSubmit,
  children,
}: Props) {
  const backgroundPressable = useRef(null);
  return (
    <>
      {visible && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.fill}>
          <Pressable onPress={onDismiss} style={[styles.page]}>
            <Pressable
              style={styles.container}
              onPress={(event) => event.stopPropagation()}
            >
              <Text style={styles.title}>{title}</Text>
              <View style={styles.divider} />
              <View>{children}</View>
              <Button text={buttonText} onPress={onSubmit} />
            </Pressable>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fill: {
    position: "absolute",
    inset: 0,
    zIndex: 1000,
  },
  page: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 1000,
  },
  container: {
    backgroundColor: "#2e2f30",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    zIndex: 1001,
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
  message: {
    color: "#85858588",
    fontSize: 18,
  },
});
