/* eslint-disable react-native/no-inline-styles */
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../../../theme/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/NavigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const { width } = Dimensions.get("window");

const movie = {
  adult: false,
  backdrop_path: "/9DYFYhmbXRGsMhfUgXM3VSP9uLX.jpg",
  belongs_to_collection: {
    id: 313086,
    name: "The Conjuring Collection The Conjuring Collection The Conjuring Collection",
    poster_path: "/z5VKhNSQKQyxm0co68HAkCqHnmX.jpg",
    backdrop_path: "/kHZaX0vuhZdbuq0WKU3BpA9WIQ0.jpg",
  },
  budget: 55000000,
  genres: [{ id: 27, name: "Horror" }],
  homepage: "http://www.theconjuringmovie.com",
  id: 1038392,
  imdb_id: "tt22898462",
  origin_country: ["US"],
  original_language: "en",
  original_title: "The Conjuring: Last Rites",
  overview:
    "Paranormal investigators Ed and Lorraine Warren take on one last terrifying case involving mysterious entities they must confront.",
  popularity: 650.5492,
  poster_path: "/gXMnx7C3cufzBHPZynWZLUHOMOT.jpg",
  production_companies: [
    { id: 12, name: "New Line Cinema", logo_path: "/2ycs64eqV5rqKYHyQK0GVoKGvfX.png", origin_country: "US" },
    { id: 76907, name: "Atomic Monster", logo_path: "/ygMQtjsKX7BZkCQhQZY82lgnCUO.png", origin_country: "US" },
    { id: 11565, name: "The Safran Company", logo_path: "/odU3l6csuBmXUrzFm6araUgEUHQ.png", origin_country: "US" },
    { id: 216687, name: "Domain Entertainment", logo_path: "/kKVYqekveOvLK1IgqdJojLjQvtu.png", origin_country: "US" },
  ],
  production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
  release_date: "2025-09-03",
  revenue: 467157072,
  runtime: 135,
  spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }],
  status: "Released",
  tagline: "The case that ended it all.",
  title: "The Conjuring: Last Rites The Conjuring Collection The Conjuring Collection",
  video: false,
  vote_average: 6.9,
  vote_count: 839,
};

type IconWithContentProps = {
  IconComponent: any; // The icon component itself
  iconName: string;
  iconColor: string;
  content: string;
};
type MovieCardNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail2'>;
const IconWithContent = ({ IconComponent, iconName, iconColor, content }: IconWithContentProps) => {
  return (
    <View style={styles.iconWithContentContainer}>
      <IconComponent name={iconName} size={moderateScale(14)} color={iconColor} />
      <Text style={styles.infoText}>{content}</Text>
    </View>
  );
};
const MovieDetails = () => {
  const handleBack = () => {
    console.log('Back pressed');
  };
  const navigation = useNavigation<MovieCardNavigationProp>();
  const handleShare = () => {
    console.log('Share pressed');
  };
  const handlePlay = () => {
    navigation.navigate('MovieDetail2')
  }
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../../../assets/images/detail.png')}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Red overlay */}
            <View style={styles.overlay} />
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
                <Ionicons name="arrow-back" size={moderateScale(24)} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
                <Ionicons name="share-social-outline" size={moderateScale(24)} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.videoPlayContainer}>
              <TouchableOpacity onPress={handlePlay} style={styles.videoButton}>
                <FontAwesome5 name="play" size={moderateScale(23)} color="#AB8BFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {/* Title and Tagline */}
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.tagline}>{movie.tagline}</Text>

            {/* Basic Info */}
            <View style={styles.row}>
              <IconWithContent   IconComponent={FontAwesome}  iconName='star' iconColor='#FFCD1A' content={`${movie.vote_count} votes`} />
              <IconWithContent IconComponent={Entypo} iconName='video' iconColor='#A8B5DB' content={`${movie.runtime} min`} />
              <IconWithContent IconComponent={Fontisto} iconName='date' iconColor='#A8B5DB' content={`${movie.release_date}`} />
            </View>

            {/* Adult */}
            <Text style={styles.overview}>🔞 Adult: {movie.adult ? "Yes" : "No"}</Text>

            {/* Original Info */}
            <Text style={styles.overview}>🎬 Original Title: {movie.original_title}</Text>
            <Text style={styles.overview}>🌐 Original Language: {movie.original_language.toUpperCase()}</Text>
            <Text style={styles.overview}>🏳️ Origin Country: {movie.origin_country.join(", ")}</Text>

            {/* Genres */}
            <View style={{marginTop: moderateScale(10)}}>
            <FlatList
              data={movie.genres}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.iconWithContentContainer}>
                  <Text style={styles.infoText}>{item.name}</Text>
                </View>
              )}
            />
            </View>

            {/* Overview */}
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>{movie.overview}</Text>
            </View>

            {/* Belongs to Collection */}
            <View style={styles.sectionContentWrapper}>
              {movie.belongs_to_collection && (
                <View>
                  <Text style={styles.sectionTitle}>Collection</Text>
                  <Text style={styles.overview}>{movie.belongs_to_collection.name}</Text>
                  <Image
                    source={{ uri: IMAGE_BASE_URL + movie.belongs_to_collection.poster_path }}
                    style={styles.collectionPoster}
                    resizeMode="cover"
                  />
                </View>
              )}
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

            {/* Production Countries */}
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.sectionTitle}>Production Countries</Text>
              {movie.production_countries.map((country, index) => (
                <Text key={index} style={styles.overview}>{country.name} ({country.iso_3166_1})</Text>
              ))}
            </View>
            {/* Spoken Languages */}
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.sectionTitle}>Spoken Languages</Text>
              {movie.spoken_languages.map((lang, index) => (
                <Text key={index} style={styles.overview}> {lang.english_name} ({lang.iso_639_1})</Text>
              ))}
            </View>
            {/* Budget & Revenue */}
            <View style={styles.row}>
            <IconWithContent IconComponent={MaterialIcons} iconName='attach-money' iconColor='#A8B5DB' content={`Budget: ${movie.budget.toLocaleString()}`} />
            <IconWithContent IconComponent={Ionicons} iconName='pie-chart' iconColor='#A8B5DB' content={`Revenue: ${movie.revenue.toLocaleString()}`} />
            <IconWithContent IconComponent={FontAwesome} iconName='imdb' iconColor='#A8B5DB' content={`IMDB: ${movie.imdb_id}`} />
            </View>
            {/* IMDB & Homepage */}
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.infoLink} onPress={() => Linking.openURL(movie.homepage)}>
                🌐 Homepage
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  iconWithContentContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap: moderateScale(6),
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(12),
    backgroundColor: '#221F3D',
    borderRadius: moderateScale(4),
  },
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  imageWrapper: {
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
  description: {
    color: '#aaa',
    fontSize: moderateScale(14),
    fontWeight: 400,
    lineHeight: 20,
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
  tagline: { color: "#aaa", fontSize: 14, fontStyle: "italic", marginBottom: 12 },
  row: { flexDirection: "row", gap: scale(10), marginBottom: 12 , flexWrap : 'wrap' },
  infoText: { color: "#ccc", fontSize: 12, marginBottom: 4 },
  infoLink: { color: "#4DA6FF", fontSize: 12, marginBottom: 4, textDecorationLine: "underline" },
  genreBadge: {
    backgroundColor: "#292647",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: { color: "#fff", fontSize: 12 },
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
