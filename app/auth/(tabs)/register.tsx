import Button from "@/components/Button";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "@/firebase";
import InputError from "@/components/InputError";
import { router } from "expo-router";

type InputErrors = {
  password?: string;
  email?: string;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<InputErrors>({});

  const validateForm = () => {
    let newErrors: InputErrors = {};
    if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (password != passwordConfirmation) {
      newErrors.password = "Passwords do not match";
    }
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const register = () => {
    if (validateForm()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => () => router.replace("/"))
        .catch((error: AuthError) => {
          let newErrors: InputErrors = {};
          if (error.code === "auth/email-already-in-use") {
            newErrors.email = "Email already exists";
          } else if (error.code === "auth/invalid-email") {
            newErrors.email = "Invalid email address";
          } else if (error.code === "auth/invalid-credential") {
            newErrors.email = "Invalid credentials.";
          } else {
            newErrors.email = error.code;
          }
          setErrors(newErrors);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior="height">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputGroup}>
          <InputLabel>Email Address</InputLabel>
          <TextInput value={email} onChangeText={setEmail} />
          {errors.email && <InputError>{errors.email}</InputError>}
        </View>
        <View style={styles.inputGroup}>
          <InputLabel>Password</InputLabel>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputGroup}>
          <InputLabel>Confirm Password</InputLabel>
          <TextInput
            secureTextEntry
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />
          {errors.password && <InputError>{errors.password}</InputError>}
        </View>
        <View style={styles.registerButton}>
          <Button text="Register" onPress={register} />
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
  inputGroup: {
    gap: 4,
  },
  registerButton: {
    gap: 16,
    alignItems: "flex-end",
  },
});
