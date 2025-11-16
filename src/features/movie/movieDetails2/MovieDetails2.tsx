/* eslint-disable react-native/no-inline-styles */
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from '../../../theme/metrics';
import VideoPlayer from '../_components/VideoPlayer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMovieDetailsByID } from '../../../hooks/queries/useMovies';
import { RootStackParamList } from '../../../types/NavigationTypes';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


type DetailsRouteProp = RouteProp<RootStackParamList, "MovieDetail2">;

const MovieDetails2 = () => {
  const route = useRoute<DetailsRouteProp>();
  const id = route?.params?.id;

  const { data: movie, isLoading } = useMovieDetailsByID(id);

  if (isLoading || !movie) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#E50914" barStyle="light-content" />

      <View>
        <VideoPlayer />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>

          {/* Title */}
          <Text style={styles.title}>{movie?.title ?? "No Title"}</Text>

          {/* Collection */}
          <View style={styles.sectionContentWrapper}>
            {movie?.belongs_to_collection?.poster_path && (
              <View>
                <Text style={styles.sectionTitle}>Collection</Text>

                <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}${movie?.belongs_to_collection?.poster_path}`,
                  }}
                  style={styles.collectionPoster}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>

          {/* Spoken Languages */}
          <View style={styles.sectionContentWrapper}>
            <Text style={styles.sectionTitle}>Spoken Languages</Text>

            {movie?.spoken_languages?.length > 0 ? (
              movie?.spoken_languages?.map((lang :any, index:number) => (
                <Text key={index} style={styles.overview}>
                  {lang?.english_name} ({lang?.iso_639_1})
                </Text>
              ))
            ) : (
              <Text style={styles.overview}>No language data</Text>
            )}
          </View>

          {/* Production Companies */}
          <View style={styles.sectionContentWrapper}>
            <Text style={styles.sectionTitle}>Production Companies</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {movie?.production_companies?.map((company:any) => (
                <View key={company?.id} style={styles.companyCard}>
                  <Image
                    source={{ uri: `${IMAGE_BASE_URL}${company?.logo_path}` }}
                    style={styles.companyLogo}
                    resizeMode="contain"
                  />

                  <Text style={styles.companyName}>
                    {company?.name ?? "Unknown Company"}
                  </Text>

                  <Text style={styles.infoText}>
                    {company?.origin_country ?? "N/A"}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default MovieDetails2;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#030014",
  },
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(40),
  },
  title: {
    color: '#fff',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(28),
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#A8B5DB",
    fontSize: moderateScale(12),
    marginBottom: moderateScale(8),
  },
  sectionContentWrapper: {
    marginVertical: verticalScale(20),
  },
  overview: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  collectionPoster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginTop: 8,
  },
  companyCard: {
    width: 100,
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#292647",
    borderRadius: 10,
    padding: 8,
  },
  companyLogo: { width: 60, height: 60, marginBottom: 4 },
  companyName: { color: "#fff", fontSize: 12, textAlign: "center" },
  infoText: { color: "#ccc", fontSize: 12 },
});
