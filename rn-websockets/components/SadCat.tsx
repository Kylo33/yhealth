import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SadCat({ children }: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="cat" size={64} color="#85858588" />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#85858588",
  },
});
