import { ComponentProps } from "react";
import { View, TextInput as RNTextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
};

export default function TextInput({ placeholder, value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        cursorColor="#ef8228"
        placeholderTextColor="#ffffff11"
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#343637",
    borderRadius: 8,
  },
  input: {
    fontSize: 18,
    color: "#ffffff88",
  },
});
