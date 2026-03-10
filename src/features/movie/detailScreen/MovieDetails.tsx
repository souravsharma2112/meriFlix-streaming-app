/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { moderateScale, scale, verticalScale} from "../../../theme/metrics";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/NavigationTypes";
import { useMovieDetailsByID, useMovieVideoDetailsByID } from "../../../hooks/queries/useMovies";
import { BASE_IMAGE_URL } from "@env";
import VideoPlayer from "../_components/VideoPlayer";
import { StyleProp, ViewStyle } from "react-native";
import { useGetYoutubeDirectURL } from "../../../hooks/queries/useYoutube";
import { Entypo, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from "../../../utils/Icons";
type DetailsRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

const IconWithContent = ({ IconComponent, iconName, iconColor, content }: any) => (
  <View style={styles.iconWithContentContainer}>
    <IconComponent
      name={iconName}
      size={moderateScale(14)}
      color={iconColor}
    />
    <Text style={styles.infoText}>{content}</Text>
  </View>
);
type DynamicWrapperProps = {
  scroll?: boolean;             
  style?: StyleProp<ViewStyle>; 
  children: ReactNode;           
};
const MovieDetails = () => {
  const route = useRoute<DetailsRouteProp>();
  const id = route?.params?.id;
  console.log(id, "id");
  
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const { data: movie, isPending } = useMovieDetailsByID(id);
  const { data: movieVideo, isPending:isVideoLoading } = useMovieVideoDetailsByID(id);
  const { data: movieVideoPath, isPending:isVideoPathLoading } = useGetYoutubeDirectURL(movieVideo?.results[4]?.key ?? "Lz5mf-kKPRc");

 console.log(movieVideoPath, "movieVideoPath");
 
  
  const handlePlay = () => setVideoVisible(true);
  if (isVideoPathLoading || isVideoLoading || isPending || !movie) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }
  const DynamicWrapper = ({ scroll, children, style }:DynamicWrapperProps) => {
    const Wrapper = scroll ? ScrollView : View;
    return <Wrapper style={style}>{children}</Wrapper>;
  }
  return (
    <DynamicWrapper scroll={!videoVisible} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* HEADER IMAGE */}
        {videoVisible ? (
          <View>
            <VideoPlayer data={movieVideoPath}/>
          </View>
        ) : (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: `${BASE_IMAGE_URL}${movie?.poster_path}` }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlay} />

            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-social-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.videoPlayContainer}>
              <TouchableOpacity onPress={handlePlay} style={styles.videoButton}>
                <FontAwesome5 name="play" size={23} color="#AB8BFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}


        {/* CONTENT */}
        <DynamicWrapper scroll={videoVisible} style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.tagline}>{movie?.tagline}</Text>

          {/* BASIC INFO */}
          <View style={styles.row}>
            <IconWithContent
              IconComponent={FontAwesome}
              iconName="star"
              iconColor="#FFCD1A"
              content={`${movie?.vote_count ?? 0} votes`}
            />
            <IconWithContent
              IconComponent={Entypo}
              iconName="video"
              iconColor="#A8B5DB"
              content={`${movie?.runtime ?? 0} min`}
            />
            <IconWithContent
              IconComponent={Fontisto}
              iconName="date"
              iconColor="#A8B5DB"
              content={movie?.release_date ?? "N/A"}
            />
          </View>

          {/* INFO */}
          <Text style={styles.overview}>🔞 Adult: {movie?.adult ? "Yes" : "No"}</Text>
          <Text style={styles.overview}>🎬 Original Title: {movie?.original_title}</Text>
          <Text style={styles.overview}>
            🌐 Original Language: {movie?.original_language?.toUpperCase()}
          </Text>
          <Text style={styles.overview}>
            🏳️ Origin Country: {movie?.origin_country?.join(", ")}
          </Text>

          {/* GENRES */}
          <FlatList
            data={movie?.genres ?? []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id?.toString()}
            renderItem={({ item }) => (
              <View style={styles.iconWithContentContainer}>
                <Text style={styles.infoText}>{item?.name}</Text>
              </View>
            )}
            style={{ marginTop: 10 }}
          />

          {/* OVERVIEW */}
          <Section title="Overview" content={movie?.overview} />

          {/* COLLECTION */}
          {movie?.belongs_to_collection && (
            <View style={styles.sectionContentWrapper}>
              <Text style={styles.sectionTitle}>Collection</Text>
              <Text style={styles.overview}>
                {movie?.belongs_to_collection?.name}
              </Text>

              <Image
                source={{
                  uri: BASE_IMAGE_URL + movie?.belongs_to_collection?.poster_path,
                }}
                style={styles.collectionPoster}
              />
            </View>
          )}

          {/* PRODUCTION COMPANIES */}
          <View style={styles.sectionContentWrapper}>
            <Text style={styles.sectionTitle}>Production Companies</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(movie?.production_companies ?? []).map((company: { logo_path: string; id: number; name: string; origin_country: string; }) => (
                <View key={company?.id} style={styles.companyCard}>
                  {company?.logo_path ? (
                    <Image
                      source={{ uri: BASE_IMAGE_URL + company?.logo_path }}
                      style={styles.companyLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.noLogo} />
                  )}
                  <Text style={styles.companyName}>{company?.name}</Text>
                  <Text style={styles.infoText}>{company?.origin_country}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* PRODUCTION COUNTRIES */}
          <Section
            title="Production Countries"
            content={(movie?.production_countries ?? [])
              .map((c: { name: string; iso_3166_1: string; }) => `${c?.name} (${c?.iso_3166_1})`)
              .join("\n")}
          />

          {/* SPOKEN LANGUAGES */}
          <Section
            title="Spoken Languages"
            content={(movie?.spoken_languages ?? [])
              .map((l: { english_name: string; iso_639_1: string; }) => `${l?.english_name} (${l?.iso_639_1})`)
              .join("\n")}
          />

          {/* BUDGET & REVENUE */}
          <View style={styles.row}>
            <IconWithContent
              IconComponent={MaterialIcons}
              iconName="attach-money"
              iconColor="#A8B5DB"
              content={`Budget: ${movie?.budget?.toLocaleString()}`}
            />
            <IconWithContent
              IconComponent={Ionicons}
              iconName="pie-chart"
              iconColor="#A8B5DB"
              content={`Revenue: ${movie?.revenue?.toLocaleString()}`}
            />
            <IconWithContent
              IconComponent={FontAwesome}
              iconName="imdb"
              iconColor="#A8B5DB"
              content={`IMDB: ${movie?.imdb_id}`}
            />
          </View>

          {/* HOMEPAGE */}
          {movie?.homepage && (
            <Text
              style={styles.infoLink}
              onPress={() => Linking.openURL(movie?.homepage)}
            >
              🌐 Homepage
            </Text>
          )}
        </View>
        </DynamicWrapper>
      </View>
    </DynamicWrapper>
  );
};

/* ---------- SEPARATE SECTION COMPONENT ---------- */
const Section = ({ title, content }: any) => {
  if (!content) return null;

  return (
    <View style={styles.sectionContentWrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.overview}>{content}</Text>
    </View>
  );
};

export default MovieDetails;

/* ------------------- STYLES ------------------- */
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#030014",
  },
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: verticalScale(447),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0.2,
  },
  contentContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(40),
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: 10,
  },
  tagline: {
    color: "#aaa",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 12,
  },
  actionContainer: {
    position: "absolute",
    top: verticalScale(40),
    width: "100%",
    paddingHorizontal: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
  },
  videoPlayContainer: {
    position: "absolute",
    bottom: "-6%",
    right: moderateScale(45),
  },
  videoButton: {
    backgroundColor: "#fff",
    width: scale(46),
    height: scale(46),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(23),
    paddingLeft: 4,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
    marginBottom: 12,
  },
  iconWithContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(12),
    backgroundColor: "#221F3D",
    borderRadius: 4,
  },
  infoText: {
    color: "#ccc",
    fontSize: 12,
  },
  infoLink: {
    color: "#4DA6FF",
    fontSize: 12,
    marginTop: 10,
    textDecorationLine: "underline",
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
    padding: 8,
    marginRight: 12,
    backgroundColor: "#292647",
    borderRadius: 10,
  },
  companyLogo: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  noLogo: {
    width: 60,
    height: 60,
    backgroundColor: "#111",
    borderRadius: 6,
    marginBottom: 4,
  },
  companyName: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
