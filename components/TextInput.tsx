import {
  KeyboardTypeOptions,
  TextInput as RNTextInput,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText?: (newValue: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export default function TextInput({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  keyboardType,
}: Props) {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#858585",
  },
  textInput: {
    fontSize: 18,
  },
});
