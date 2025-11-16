import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import HomeHeader from "../../components/header/HomeHeader";
import MovieCard from "../../components/common/movieCard/MovieCard";
import MovieCardSkeleton from "../../components/skeleton/MovieCardSkelton";

import { moderateScale, verticalScale } from "../../theme/metrics";
import {
  usePopularMovies,
  useTrendingNowMovies,
  useTrendingWeekMovies,
  useUpcomingMovies,
} from "../../hooks/queries/useMovies";


const skeletonItems = Array.from({ length: 9 }, (_, i) => ({ id: `${i}` }));

interface SectionProps {
  title: string;
  data: any[];
  isLoading: boolean;
}

const HorizontalSection = ({ title, data, isLoading }: SectionProps) => (
  <View style={styles.sectionHorizontal}>
    <Text style={styles.sectionTitle}>{title}</Text>

    <FlatList
      data={isLoading ? skeletonItems : data}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) =>
        isLoading ? (
          <MovieCardSkeleton isCarousel />
        ) : (
          <MovieCard isCarousel data={{ item }} />
        )
      }
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalWrapper}
    />
  </View>
);

const GridSection = ({ title, data, isLoading }: SectionProps) => (
  <View style={styles.sectionGrid}>
    <Text style={styles.sectionTitle}>{title}</Text>

    <FlatList
      data={isLoading ? data : data}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) => isLoading ? <MovieCardSkeleton isCarousel={false} /> : <MovieCard data={{ item }} />}
      numColumns={3}
      columnWrapperStyle={styles.gridRow}
      scrollEnabled={false}
    />
  </View>
);

const HomeScreen = () => {
  const { isLoading: loadingUpcoming, data: upcoming } = useUpcomingMovies();
  const { isLoading: loadingPopular, data: popular } = usePopularMovies();
  const { isLoading: loadingTrendingNow, data: trendingNow } = useTrendingNowMovies();
  const { isLoading: loadingWeek, data: trendingWeek } = useTrendingWeekMovies();

  const sections = [
    { key: "header" },
    { key: "upcoming" },
    { key: "trendingNow" },
    { key: "trendingWeek" },
    { key: "popular" },
    { key: "latest" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case "header":
              return <HomeHeader />;

            case "upcoming":
              return (
                <HorizontalSection
                  title="Upcoming Movies"
                  data={upcoming?.results}
                  isLoading={loadingUpcoming}
                />
              );

            case "trendingNow":
              return (
                <GridSection
                  title="Trending Now"
                  data={trendingNow?.results?.slice(0, 9) ?? []}
                  isLoading={loadingTrendingNow}
                />
              );

            case "trendingWeek":
              return (
                <HorizontalSection
                  title="Trending Week"
                  data={trendingWeek?.results}
                  isLoading={loadingWeek}
                />
              );

            case "popular":
              return (
                <HorizontalSection
                  title="Popular Shows"
                  data={popular?.results}
                  isLoading={loadingPopular}
                />
              );

            case "latest":
              return <GridSection title="Latest Shows" data={skeletonItems} isLoading={true} />;

            default:
              return null;
          }
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(40) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },

  /* Horizontal section */
  sectionHorizontal: {
    marginTop: verticalScale(40),
    marginLeft: moderateScale(16),
  },

  horizontalWrapper: {
    paddingRight: moderateScale(16),
    gap: moderateScale(20),
  },

  /* Grid section */
  sectionGrid: {
    marginHorizontal: moderateScale(16),
  },

  gridRow: {
    justifyContent: "space-between",
    marginBottom: moderateScale(20),
  },

  /* Typography */
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#fff",
    marginBottom: verticalScale(14),
  },
});

export default HomeScreen;
