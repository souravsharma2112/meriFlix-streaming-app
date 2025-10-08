import React from "react";
import {StyleSheet,View,Text,FlatList} from "react-native";
import { COLORS } from "../../constants/colors";
import HomeHeader from "../../components/header/HomeHeader";

const movies = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  title: `Movie ${i + 1}`,
}));

const HomeScreen = () => {
  const renderMovieCard = ({ item, index }: { item: any; index: number }) => {
    const colors = ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7", "#a29bfe"];
    const backgroundColor = colors[index % colors.length];

    return (
      <View style={[styles.movieCard, { backgroundColor }]}>
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        numColumns={2}
        ListHeaderComponent={HomeHeader}
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

});

export default HomeScreen;
