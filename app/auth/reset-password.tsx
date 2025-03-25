import Button from "@/components/Button";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { auth } from "@/firebase";
import { AuthError, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!(email.trim() && email.includes("@"))) {
      setEmailError("Invalid email address.");
      return false;
    }
    return true;
  };

  const sendResetEmail = async () => {
    if (!validate()) return;
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailError("");
    } catch (error: any) {
      const code = error.code;
      if (false) {
      } else {
        setEmailError(code);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior="height">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textDescription}>
          Need to reset your password? No problem. Enter your email below, and
          we'll send you a link to reset your password.
        </Text>
        <View style={styles.inputGroup}>
          <InputLabel>Email Address</InputLabel>
          <TextInput value={email} onChangeText={setEmail} />
          {emailError && <InputError>{emailError}</InputError>}
        </View>
        <View style={styles.sendButton}>
          <Button text="Send" onPress={sendResetEmail} />
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
  },
  textDescription: {
    fontSize: 18,
    color: "#858585",
    textAlign: "center",
  },
  inputGroup: {
    gap: 4,
  },
  sendButton: {
    alignItems: "flex-end",
  },
});
