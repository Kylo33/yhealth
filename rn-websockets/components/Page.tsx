import { ImageSource } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Hero from "./Hero";

export default function Page({
  imageSource,
  title,
  text,
}: {
  imageSource: ImageSource;
  title: string;
  text: string;
}) {
  return (
    <>
      <Hero imageSource={imageSource} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{text}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 18 * 1.25,
  },
  textContainer: {
    padding: 32,
    gap: 16,
    flex: 1,
  },
});
