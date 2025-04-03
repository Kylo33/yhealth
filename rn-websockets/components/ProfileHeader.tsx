import { View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  level: number;
  score: number;
};

export default function ProfileHeader({ name, level, score }: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#ef8228",
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{score} points</Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.levelIcon}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: 16,
    width: "100%",
    padding: 16,
  },
  divider: {
    width: 1,
    backgroundColor: "#ffffff88",
  },
  iconContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#ffffff55",
  },
  levelIcon: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#ffffffbb",
  },
});
