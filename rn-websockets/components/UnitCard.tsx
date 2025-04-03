import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  title: string;
}>;

export default function UnitCard({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      <View style={styles.lessonContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#2e2f30",
    borderRadius: 32,
    gap: 16,
  },
  divider: {
    backgroundColor: "#85858588",
    height: 1,
  },
  title: {
    fontSize: 18,
    color: "#858585",
    fontWeight: "bold",
  },
  lessonContainer: {
    gap: 16,
  },
});
