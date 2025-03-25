import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function InputLabel({ children }: PropsWithChildren) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
