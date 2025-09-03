import React, { FC } from "react";
import { StyleSheet, View, TextInput, Dimensions, TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search...", ...rest }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={width * 0.06} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    width: width * 0.9, // 90% of screen width
    height: width * 0.12, // responsive height
    alignSelf: "center",
    marginVertical: 12,
  },
  icon: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.045,
    color: "#fff",
  },
});

export default SearchBar;
