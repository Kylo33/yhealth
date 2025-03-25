import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/auth/login">Login Screen</Link>
    </View>
  );
}
