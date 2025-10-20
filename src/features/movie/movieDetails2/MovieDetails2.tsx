/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../../../theme/metrics';
import VideoPlayer from '../_components/VideoPlayer';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const { width } = Dimensions.get("window");

const movie = {
  belongs_to_collection: {
    id: 313086,
    name: "The Conjuring Collection The Conjuring Collection The Conjuring Collection",
    poster_path: "/z5VKhNSQKQyxm0co68HAkCqHnmX.jpg",
    backdrop_path: "/kHZaX0vuhZdbuq0WKU3BpA9WIQ0.jpg",
  },
  production_companies: [
    { id: 12, name: "New Line Cinema", logo_path: "/2ycs64eqV5rqKYHyQK0GVoKGvfX.png", origin_country: "US" },
    { id: 76907, name: "Atomic Monster", logo_path: "/ygMQtjsKX7BZkCQhQZY82lgnCUO.png", origin_country: "US" },
    { id: 11565, name: "The Safran Company", logo_path: "/odU3l6csuBmXUrzFm6araUgEUHQ.png", origin_country: "US" },
    { id: 216687, name: "Domain Entertainment", logo_path: "/kKVYqekveOvLK1IgqdJojLjQvtu.png", origin_country: "US" },
  ],
  production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
  spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }],
  title: "The Conjuring: Last Rites The Conjuring Collection The Conjuring Collection",
};

const MovieDetails2 = () => {

  return (
    <>
      <StatusBar
        backgroundColor="#E50914" // Netflix red
        barStyle="light-content"
      />

      <View>
        <VideoPlayer />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Title and Tagline */}
          <Text style={styles.title}>{movie.title}</Text>

          {/* Belongs to Collection */}
          <View style={styles.sectionContentWrapper}>
            {movie.belongs_to_collection && (
              <View>
                <Text style={styles.sectionTitle}>Collection</Text>
                <Image
                  source={{ uri: IMAGE_BASE_URL + movie.belongs_to_collection.poster_path }}
                  style={styles.collectionPoster}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
          {/* Spoken Languages */}
          <View style={styles.sectionContentWrapper}>
            <Text style={styles.sectionTitle}>Spoken Languages</Text>
            {movie.spoken_languages.map((lang, index) => (
              <Text key={index} style={styles.overview}> {lang.english_name} ({lang.iso_639_1})</Text>
            ))}
          </View>
          {/* Production Companies */}
          <View style={styles.sectionContentWrapper}>
            <Text style={styles.sectionTitle}>Production Companies</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {movie.production_companies.map((company) => (
                <View key={company.id} style={styles.companyCard}>
                  <Image
                    source={{ uri: IMAGE_BASE_URL + company.logo_path }}
                    style={styles.companyLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.infoText}> {company.origin_country}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  videoWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: verticalScale(447),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    opacity: 0.2,
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
    fontWeight: 700,
    marginBottom: 10,
  },
  actionContainer: {
    position: 'absolute',
    top: verticalScale(40),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
  },
  videoPlayContainer: {
    position: 'absolute',
    bottom: '-6%',
    right: moderateScale(45),
  },
  videoButton: {
    backgroundColor: '#FFFFFF',
    width: scale(46),
    height: scale(46),
    justifyContent: 'center',
    borderRadius: scale(23),
    paddingLeft: moderateScale(4),
    alignItems: 'center',
  },


  // --------------- 
  backdrop: { width: width, height: 220 },
  infoText: { color: "#ccc", fontSize: 12, marginBottom: 4 },

  sectionTitle: {
    color: "#A8B5DB",
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginBottom: moderateScale(8),
  },
  sectionContentWrapper: {
    marginBlock: verticalScale(20),
  },
  overview: { color: "#ccc", fontSize: 14, lineHeight: 20 },
  collectionPoster: { width: 150, height: 225, borderRadius: 10, marginTop: 8 },
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
});
