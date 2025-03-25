import Button from "@/components/Button";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Link, router } from "expo-router";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logo = require("@/assets/images/logo-bg.png");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.replace("/"))
      .catch(console.error);
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior="height">
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logo} style={styles.image} />
        <View style={styles.inputGroup}>
          <InputLabel>Email Address</InputLabel>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputGroup}>
          <InputLabel>Password</InputLabel>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.loginButton}>
          <Link style={styles.mutedLink} href="/auth/reset-password">
            Forgot password?
          </Link>
          <Button text="Login" onPress={login} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    gap: 16,
    padding: 16,
    // flex: 1,
  },
  image: {
    width: 240,
    height: 240,
    marginVertical: 48,
    borderRadius: 8,
    alignSelf: "center",
  },
  inputGroup: {
    gap: 4,
  },
  loginButton: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mutedLink: {
    color: "#858585",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
