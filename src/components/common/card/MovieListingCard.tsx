import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons } from '../../../utils/Icons'
import { useGenreMovieList } from '../../../hooks/queries/useConfiguration'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../types/NavigationTypes'
import { BASE_IMAGE_URL } from '@env'
type MovieCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type MovieListingCardItem = {
  id: string
  title: string
  year: number
  duration: string
  quality: 'HD' | 'Full HD' | '4K'
  rating: number
  image: ImageSourcePropType
  genres: string[]
  badgeText: string
  score: number
  rankLabel: string
}

type MovieListingCardProps = {
  data: any
  onPress?: () => void
  category?: any;
}

const MovieListingCard = ({ data, onPress , category }: MovieListingCardProps) => {

  const genreIDS = data?.genre_ids;
  const title = data?.title ? data?.title : data?.name;
  const { isLoading, data: genreData } = useGenreMovieList();
  const [genresNames, setGenreNames] = useState([]);
  const navigation = useNavigation<MovieCardNavigationProp>();
  const handlePress = (id: number) => { navigation.navigate('MovieDetail', { id: id }) }


useEffect(() => {
  if (data && genreData && genreIDS) {
    const ids = typeof genreIDS === "string" ? genreIDS.split(",").map(Number) : genreIDS;
    const dataARR = ids.map((id: number) =>
        genreData?.genres?.find(
          (g: { id: number; name: string }) => Number(g.id) === Number(id)
        )
      )
      .filter(Boolean);
    setGenreNames(dataARR);
  }
}, [data, genreData, genreIDS]);

  if (isLoading) return (
    <>
      <View>
        <Text>Loading....</Text>
      </View>
    </>
  )
  
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ImageBackground source={
        data?.backdrop_path
          ? { uri: `${BASE_IMAGE_URL}${data?.backdrop_path}` }
          : require("../../../../assets/images/m1.png")
      } style={styles.poster} imageStyle={styles.posterImage}>
        <LinearGradient
          colors={['rgba(0,0,0,0.04)', 'rgba(3,0,20,0.94)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.posterTopRow}>
          <View style={styles.posterBadge}>
            <Text style={styles.posterBadgeText} numberOfLines={1}>
              {category ?? "New"}
            </Text>
          </View>
          <View style={styles.rankPill}>
            <Text style={styles.rankPillText}>{data.rankLabel}</Text>
          </View>
        </View>

        <View style={styles.posterBottomRow}>
          <View style={styles.qualityPill}>
            <Text style={styles.qualityPillText}>{data?.quality}</Text>
          </View>
          <View style={styles.scorePill}>
            <Ionicons name="trending-up-outline" size={11} color="#A5F3FC" />
            <Text style={styles.scorePillText}>{+data?.popularity?.toFixed()}%</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardBody}>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.inlineRow}>
          <View style={styles.inlineItem}>
            <Ionicons name="calendar-outline" size={13} color="#A9A2C5" />
            <Text style={styles.inlineText}>{data?.release_date}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Ionicons name="star" size={13} color="#FBBF24" />
            <Text style={styles.inlineText}>{data?.vote_average?.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.genreRow}>
          {Array.isArray(genresNames) && genresNames?.map((m: any) => (
            <View style={styles.genreChip}>
              <Text style={styles.genreChipText}>{m?.name ?? ""}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  )
}

export default MovieListingCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#0E0B1B',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    overflow: 'hidden',
  },
  poster: {
    height: 210,
    padding: 10,
    justifyContent: 'space-between',
  },
  posterImage: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  posterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  posterBadge: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(3,0,20,0.62)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  posterBadgeText: {
    color: '#F3EEFF',
    fontSize: 10,
    fontWeight: '600',
  },
  rankPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(3,0,20,0.62)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  rankPillText: {
    color: '#EDE8FF',
    fontSize: 10,
    fontWeight: '700',
  },
  posterBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  qualityPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(3,0,20,0.62)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  qualityPillText: {
    color: '#EDE8FF',
    fontSize: 10,
    fontWeight: '700',
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(103,232,249,0.16)',
    backgroundColor: 'rgba(103,232,249,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  scorePillText: {
    color: '#A5F3FC',
    fontSize: 10,
    fontWeight: '700',
  },
  cardBody: {
    padding: 10,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  inlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inlineText: {
    color: '#B3ACD0',
    fontSize: 10,
    fontWeight: '600',
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  genreChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#28213F',
    backgroundColor: '#151125',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  genreChipText: {
    color: '#C9C2E6',
    fontSize: 10,
  },
})
