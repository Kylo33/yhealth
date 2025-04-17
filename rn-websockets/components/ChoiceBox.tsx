import { ComponentProps, useRef } from "react";
import { View, StyleSheet, Platform, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  items: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
};

export default function ChoiceBox({
  label,
  placeholder,
  value,
  items,
  onValueChange,
}: Props) {
  const pickerRef = useRef<Picker<string>>(null);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable 
        style={styles.container}
        onPress={() => {
          if (Platform.OS === 'android') {
            pickerRef.current?.focus();
          }
        }}
      >
        <Picker
          ref={pickerRef}
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#ef8228"
          mode="dropdown"
          dropdownIconRippleColor="#343637"
          itemStyle={styles.itemStyle}
          prompt={placeholder}
        >
          {placeholder && (
            <Picker.Item
              label={placeholder}
              value=""
              color="#ffffff11"
              enabled={false}
            />
          )}
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color="#ffffff88"
              style={styles.item}
            />
          ))}
        </Picker>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#343637",
    borderRadius: 8,
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  label: {
    color: "#85858588",
    marginBottom: 8,
    fontSize: 14,
    paddingHorizontal: 16,
  },
  picker: {
    fontSize: 18,
    color: "#ffffff88",
    backgroundColor: "#343637",
    ...Platform.select({
      android: {
        marginTop: -8,
        marginBottom: -8,
      },
    }),
  },
  itemStyle: {
    fontSize: 18,
    color: "#ffffff88",
    backgroundColor: "#343637",
    ...Platform.select({
      android: {
        height: 40,
        backgroundColor: "#343637",
      },
    }),
  },
  item: {
    backgroundColor: "#343637",
    ...Platform.select({
      android: {
        backgroundColor: "#343637",
      },
    }),
  },
});