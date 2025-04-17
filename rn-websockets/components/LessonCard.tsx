import { Href, Link, RelativePathString } from "expo-router";
import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

type IconParameters = {
  size: number;
  color: string;
};

type Props = {
  href: Href;
  title: string;
  description: string;
  icon: (iconParams: IconParameters) => ReactElement;
  color: string;
  disabled?: boolean;
};

export default function LessonCard({
  title,
  description,
  href,
  icon,
  color,
  disabled = false,
}: Props) {
  const content = (
    <View style={[styles.container, { backgroundColor: color, opacity: disabled ? 0.5 : 1 }]}>
      <View style={styles.iconContainer}>
        {icon({ color: "#fff", size: 48 })}
      </View>
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    borderRadius: 16,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  divider: {
    width: 1,
    backgroundColor: "#ffffff88",
  },
  iconContainer: {
    alignSelf: "center",
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
    fontSize: 14,
    color: "#ffffff88",
  },
});
