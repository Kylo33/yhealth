import Button from "@/components/Button";
import { auth } from "@/firebase";
import { Link, router } from "expo-router";
import { signOut } from "firebase/auth";
import { Text, View } from "react-native";

export default function Index() {
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
      <Button
        onPress={() => {
          signOut(auth).then(() => router.replace("/auth/login"));
        }}
        text="Log Out"
      />
    </View>
  );
}
