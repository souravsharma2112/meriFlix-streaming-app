import React, { FC } from "react";
import { StyleSheet, View, TextInput, TextInputProps, Platform, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale } from "../theme/metrics";

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPressBar?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  onPressBar,
  ...rest
}) => {
  const isPressOnly = typeof onPressBar === "function";

  return (
    <Pressable
      style={styles.wrapper}
      onPress={onPressBar}
      disabled={!isPressOnly}
    >
      {/* Blur background */}
      <BlurView
        blurType={Platform.OS === "ios" ? "light" : "light"}
        blurAmount={16}
      />
      {/* Simulated inset/glow using gradient */}
      <LinearGradient
        colors={["#0F0D23", "#0F0D23"]}
      />

      {/* Content */}
      <View style={styles.innerContainer} pointerEvents={isPressOnly ? "none" : "auto"}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A8B5DB"
          onChangeText={onChangeText}
          value={value}
          editable={!isPressOnly}
          {...rest}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '91%',
    borderRadius: moderateScale(30),
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 'auto',
    backgroundColor: "#0F0D23",
    shadowColor: "#CECEFB",
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 32,
    elevation: 5,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(14),
    paddingVertical : moderateScale(0)
  },
  icon: {
    marginRight: moderateScale(10),
    color: "#AB8BFF",
    fontSize: moderateScale(18)
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: "#A8B5DB",
  },
});

export default SearchBar;
