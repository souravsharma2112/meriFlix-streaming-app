import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import HomeHeader from "../../components/header/HomeHeader";
import MovieCard from "../../components/common/movieCard/MovieCard";
import { moderateScale, verticalScale } from "../../theme/metrics";

const movies = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  title: `Movie ${i + 1}`,
}));

const HomeScreen = () => {
  const renderPopularShows = () => (
    <View style={styles.popularContainer}>
      <Text style={styles.sectionTitle}>Popular Shows</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={() => <MovieCard isCarousel={true} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.popularWrapper}
      />
    </View>
  );

  const renderLatestShows = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Latest Shows</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={()=> <MovieCard />}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: "header" }, { key: "popular" }, { key: "latest" }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "header":
              return <HomeHeader />;
            case "popular":
              return renderPopularShows();
            case "latest":
              return renderLatestShows();
            default:
              return null;
          }
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(50) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },
  popularContainer:{
    marginTop: verticalScale(50),
    marginLeft: moderateScale(18),
  },
  popularWrapper:{
    marginLeft: moderateScale(10),
    gap:moderateScale(24),
  },
  sectionContainer: {
    marginBlock: verticalScale(41),
    marginHorizontal: moderateScale(16),
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: moderateScale(18),
    lineHeight: moderateScale(20),
    color: "#ffffff",
    marginBottom: verticalScale(14),
  },
  row: {
    justifyContent: "space-between",
    gap: moderateScale(21.5),
    marginBottom: moderateScale(24),
  },
});

export default HomeScreen;
