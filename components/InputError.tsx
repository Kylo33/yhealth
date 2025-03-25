import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function InputError({ children }: PropsWithChildren) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff5555",
  },
});
