import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { COLORS } from "../../constants/colors";
import LinearGradient from "react-native-linear-gradient";
import SearchBar from "../../components/SearchBar";

const { width, height } = Dimensions.get("window");

const movies = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  title: `Movie ${i + 1}`,
}));

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderMovieCard = ({ item, index }: { item: any; index: number }) => {
    const colors = ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7", "#a29bfe"];
    const backgroundColor = colors[index % colors.length];

    return (
      <View style={[styles.movieCard, { backgroundColor }]}>
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    );
  };

  // 👇 Header Section for FlatList
  const renderHeader = () => (
    <ImageBackground
      source={require("../../../assets/images/homebg.png")}
      style={styles.topSection}
      resizeMode="stretch"
    >
      <LinearGradient
        colors={["rgba(35, 42, 255, 0.6)", "#0b0e142c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      >
        {/* Logo + Text Row */}
        <View style={styles.logoRow}>
          <Image
            source={require("../../../assets/images/meriFlix.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>meriFlix</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search movies..."
        />

        <Text style={styles.text}>Top Section (Scrolls with list)</Text>
      </LinearGradient>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        numColumns={2} // 👈 grid
        ListHeaderComponent={renderHeader} // 👈 Top section scrolls with list
        contentContainerStyle={styles.movieList}
        columnWrapperStyle={styles.row}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: COLORS.primary,
  },
  topSection: {
    height: height * 0.4, // now scrolls with list
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    width:'100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 16,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: width * 0.09,
    height: width * 0.09,
    marginRight: 8,
  },
  logoText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#E50914",
    letterSpacing: 1,
  },
  movieList: {
    // paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  movieCard: {
    flex: 1,
    height: 180,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 4,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
