import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function ModalText({ children }: PropsWithChildren) {
  return <Text style={styles.modalText}>{children}</Text>;
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    color: "#858585",
  },
});
