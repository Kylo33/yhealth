import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
};

export default function Button({ text, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#ef8228",
    borderRadius: 16,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
