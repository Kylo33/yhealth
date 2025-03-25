import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
};

export default function Button({ text, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21149b",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
