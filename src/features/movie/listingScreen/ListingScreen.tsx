import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import MovieListingCard, {
  type MovieListingCardItem,
} from '../../../components/common/card/MovieListingCard'
import HeaderWithBack from '../../../components/common/HeaderWithBack/HeaderWithBack'
import { Ionicons } from '../../../utils/Icons'
import { MovieListType, useMoviesList } from '../../../hooks/queries/useMoviesList'

const PAGE_SIZE = 8
const MAX_ITEMS = 48

type ListingCategory =
  | 'trending'
  | 'trendingNow'
  | 'trendingWeek'
  | 'upcoming'
  | 'popular'
  | 'latest'
  | string

type ListingMovieItem = MovieListingCardItem & {
  subtitle: string
}

type TemplateMovie = Omit<ListingMovieItem, 'id' | 'badgeText' | 'score' | 'rankLabel'>

type CategoryMeta = {
  title: string
  subtitle: string
  accentColor: string
  icon: string
  chipLabel: string
}

const posterA = require('../../../../assets/images/m1.png')
const posterB = require('../../../../assets/images/detail.png')
const heroBg = require('../../../../assets/images/homebg.png')

const templateMovies: TemplateMovie[] = [
  {
    title: 'Midnight Echo',
    subtitle: 'Neon signals spark a citywide uprising',
    year: 2024,
    duration: '2h 08m',
    quality: '4K',
    rating: 8.8,
    image: posterA,
    genres: ['Sci-Fi', 'Drama'],
  },
  {
    title: 'Crimson Alley',
    subtitle: 'Undercover missions collide in a broken district',
    year: 2022,
    duration: '2h 06m',
    quality: '4K',
    rating: 8.0,
    image: posterB,
    genres: ['Crime', 'Action'],
  },
  {
    title: 'Silent Harbor',
    subtitle: 'A town mystery resurfaces after ten years',
    year: 2023,
    duration: '1h 54m',
    quality: 'Full HD',
    rating: 8.1,
    image: posterB,
    genres: ['Mystery', 'Thriller'],
  },
  {
    title: 'Dreamline',
    subtitle: 'Travelers cross unstable dream corridors',
    year: 2023,
    duration: '52 min',
    quality: 'HD',
    rating: 8.6,
    image: posterA,
    genres: ['Sci-Fi', 'Adventure'],
  },
  {
    title: 'Atlas Files',
    subtitle: 'Cold cases stitched into one hidden conspiracy',
    year: 2024,
    duration: '49 min',
    quality: 'Full HD',
    rating: 8.4,
    image: posterB,
    genres: ['Thriller', 'Mystery'],
  },
  {
    title: 'Golden Summer',
    subtitle: 'A warm, chaotic reunion on the coast',
    year: 2021,
    duration: '1h 46m',
    quality: 'HD',
    rating: 7.9,
    image: posterA,
    genres: ['Romance', 'Comedy'],
  },
  {
    title: 'Red Orbit',
    subtitle: 'A rescue run goes wrong beyond Mars',
    year: 2022,
    duration: '1h 57m',
    quality: '4K',
    rating: 8.7,
    image: posterA,
    genres: ['Action', 'Sci-Fi'],
  },
  {
    title: 'Paper Crowns',
    subtitle: 'Power shifts inside a fragile empire',
    year: 2023,
    duration: '2h 11m',
    quality: 'Full HD',
    rating: 8.0,
    image: posterB,
    genres: ['History', 'Drama'],
  },
  {
    title: 'Northbound',
    subtitle: 'A long road trip becomes a survival test',
    year: 2025,
    duration: '58 min',
    quality: '4K',
    rating: 8.3,
    image: posterA,
    genres: ['Drama', 'Road'],
  },
  {
    title: 'Cipher Unit',
    subtitle: 'An elite team hunts digital ghost cells',
    year: 2024,
    duration: '46 min',
    quality: 'Full HD',
    rating: 8.5,
    image: posterB,
    genres: ['Crime', 'Tech'],
  },
  {
    title: 'Kitchen Rebels',
    subtitle: 'High-pressure kitchens and wild eliminations',
    year: 2022,
    duration: '43 min',
    quality: 'HD',
    rating: 7.9,
    image: posterA,
    genres: ['Reality', 'Food'],
  },
  {
    title: 'Nova District',
    subtitle: 'A rogue crew fights an AI-policed metropolis',
    year: 2022,
    duration: '2h 19m',
    quality: '4K',
    rating: 9.1,
    image: posterA,
    genres: ['Action', 'Cyberpunk'],
  },
]

const CATEGORY_META: Record<string, CategoryMeta> = {
  trending: {
    title: 'Trending Movies',
    subtitle: 'The hottest titles viewers are watching right now.',
    accentColor: '#AB8BFF',
    icon: 'flame-outline',
    chipLabel: 'Live trend',
  },
  trendingNow: {
    title: 'Trending Now',
    subtitle: 'Fast-rising picks based on current audience activity.',
    accentColor: '#67E8F9',
    icon: 'pulse-outline',
    chipLabel: 'Now hot',
  },
  trendingWeek: {
    title: 'Trending Week',
    subtitle: 'Weekly favorites with strong replay value.',
    accentColor: '#FDE68A',
    icon: 'calendar-outline',
    chipLabel: '7-day chart',
  },
  upcoming: {
    title: 'Upcoming Movies',
    subtitle: 'Fresh releases and soon-to-drop titles for your queue.',
    accentColor: '#A7F3D0',
    icon: 'rocket-outline',
    chipLabel: 'Coming soon',
  },
  popular: {
    title: 'Popular Shows',
    subtitle: 'Most-watched shows and fan-favorite series.',
    accentColor: '#FFB0CB',
    icon: 'tv-outline',
    chipLabel: 'Popular now',
  },
  latest: {
    title: 'Latest Shows',
    subtitle: 'New additions curated for quick discovery.',
    accentColor: '#D9CBFF',
    icon: 'sparkles-outline',
    chipLabel: 'Fresh drop',
  },
}

const getCategoryMeta = (category?: ListingCategory, titleFromRoute?: string): CategoryMeta => {
  const base = CATEGORY_META[category ?? ''] ?? {
    title: titleFromRoute || 'Movies',
    subtitle: 'Explore curated titles in a clean, fast-scrolling catalog.',
    accentColor: '#AB8BFF',
    icon: 'film-outline',
    chipLabel: 'Catalog',
  }

  if (titleFromRoute) {
    return { ...base, title: titleFromRoute }
  }

  return base
}

const getBadgeByCategory = (category?: ListingCategory) => {
  switch (category) {
    case 'upcoming':
      return 'Coming Soon'
    case 'popular':
      return 'Fan Favorite'
    case 'trendingNow':
      return 'Trending Now'
    case 'trendingWeek':
      return 'Weekly Hit'
    case 'latest':
      return 'New Drop'
    default:
      return 'Top Pick'
  }
}

const buildDummyMovies = (category: ListingCategory, start: number, count: number): ListingMovieItem[] => {
  const badgeByCategory = getBadgeByCategory(category)

  return Array.from({ length: count }, (_, index) => {
    const absoluteIndex = start + index
    const templateIndex = (absoluteIndex - 1) % templateMovies.length
    const cycle = Math.floor((absoluteIndex - 1) / templateMovies.length)
    const template = templateMovies[templateIndex]
    const cycleSuffix = cycle > 0 ? ` ${cycle + 1}` : ''
    const scoreBase = 97 - ((absoluteIndex - 1) % 14)

    return {
      ...template,
      id: `${category || 'movies'}-${absoluteIndex}`,
      title: `${template.title}${cycleSuffix}`,
      badgeText: badgeByCategory,
      score: Math.max(72, scoreBase),
      rankLabel: `#${absoluteIndex}`,
    }
  })
}

const ListingScreen = () => {
  const route = useRoute<any>()
  const category = route?.params?.category as ListingCategory | undefined
  const titleFromRoute = route?.params?.title as string | undefined
  const categoryMeta = useMemo(() => getCategoryMeta(category, titleFromRoute), [category, titleFromRoute])
  console.log(category);
  

  const [movies, setMovies] = useState<ListingMovieItem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadMovies = useCallback(
    (pageNumber = page, isRefresh = false) => {
      if (loading) return
      if (!isRefresh && movies.length >= MAX_ITEMS) return

      const currentLength = isRefresh ? 0 : movies.length
      const remainingItems = MAX_ITEMS - currentLength
      const nextCount = Math.min(PAGE_SIZE, Math.max(0, remainingItems))
      if (nextCount <= 0) return

      setLoading(true)

      setTimeout(() => {
        const newMovies = buildDummyMovies(
          category || 'movies',
          isRefresh ? 1 : (pageNumber - 1) * PAGE_SIZE + 1,
          nextCount
        )

        setMovies(prev => (isRefresh ? newMovies : [...prev, ...newMovies]))
        setPage(isRefresh ? 2 : pageNumber + 1)
        setLoading(false)
        if (isRefresh) setRefreshing(false)
      }, 500)
    },
    [category, loading, movies.length, page]
  )
  const { isPending , data: movieData } = useMoviesList(category as MovieListType);

console.log(movieData);

  const loadMoviesRef = useRef(loadMovies)

  useEffect(() => {
    loadMoviesRef.current = loadMovies
  }, [loadMovies])

  useEffect(() => {
    setMovies([])
    setPage(1)
    setRefreshing(false)
    setLoading(false)

    const timer = setTimeout(() => {
      loadMoviesRef.current(1, true)
    }, 80)

    return () => clearTimeout(timer)
  }, [category, titleFromRoute])

  const handleLoadMore = () => {
    loadMovies()
  }

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    loadMovies(1, true)
  }, [loadMovies])

  const renderItem = ({ item }: { item: ListingMovieItem }) => <MovieListingCard data={item} category={category}/>

  const totalLoaded = movies.length
  const isListExhausted = totalLoaded >= MAX_ITEMS

  if(isPending) return (
    <>
    <View>
      <Text>Loading....</Text>
    </View>
    </>
  )

  return (
    <HeaderWithBack headerTitle={categoryMeta.title}>
      <FlatList
        data={movieData?.results ?? []}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.45}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#E50914']}
            tintColor="#E50914"
          />
        }
        ListHeaderComponent={
          <>
            <ImageBackground source={heroBg} style={styles.hero} imageStyle={styles.heroImage}>
              <LinearGradient
                colors={['rgba(11,8,26,0.55)', 'rgba(11,8,26,0.93)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroOverlay}
              >
                <View style={styles.heroTop}>
                  <View style={styles.heroIconWrap}>
                    <Ionicons name={categoryMeta.icon as any} size={18} color="#E8E1FF" />
                  </View>
                  <View style={[styles.heroChip, { borderColor: `${categoryMeta.accentColor}30` }]}>
                    <View
                      style={[styles.heroChipDot, { backgroundColor: categoryMeta.accentColor }]}
                    />
                    <Text style={styles.heroChipText}>{categoryMeta.chipLabel}</Text>
                  </View>
                </View>

                <Text style={styles.heroTitle}>{categoryMeta.title}</Text>
                <Text style={styles.heroSubtitle}>{categoryMeta.subtitle}</Text>

                <View style={styles.heroStatsRow}>
                  <View style={styles.heroStatCard}>
                    <Text style={styles.heroStatValue}>{MAX_ITEMS}</Text>
                    <Text style={styles.heroStatLabel}>Dummy Titles</Text>
                  </View>
                  <View style={styles.heroStatCard}>
                    <Text style={styles.heroStatValue}>4K+</Text>
                    <Text style={styles.heroStatLabel}>Quality Mix</Text>
                  </View>
                  <View style={styles.heroStatCard}>
                    <Text style={styles.heroStatValue}>2 Col</Text>
                    <Text style={styles.heroStatLabel}>Modern Grid</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Results</Text>
              <View style={styles.sectionCountBadge}>
                <Text style={styles.sectionCountText}>{totalLoaded}</Text>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            {loading && !refreshing ? (
              <ActivityIndicator
                size="large"
                color="#E50914"
                style={styles.footerLoader}
              />
            ) : null}
            {isListExhausted ? (
              <View style={styles.endCard}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#9DF1B9" />
                <Text style={styles.endCardText}>You have reached the end of this dummy listing.</Text>
              </View>
            ) : null}
          </>
        }
      />
    </HeaderWithBack>
  )
}

export default ListingScreen

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 6,
    paddingBottom: 28,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  hero: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.14)',
    marginBottom: 14,
  },
  heroImage: {
    borderRadius: 20,
  },
  heroOverlay: {
    padding: 14,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  heroChipDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  heroChipText: {
    color: '#DED8F6',
    fontSize: 11,
    fontWeight: '600',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 12,
  },
  heroSubtitle: {
    color: '#BCB5D8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  heroStatCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    paddingVertical: 10,
  },
  heroStatValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  heroStatLabel: {
    color: '#B8B1D7',
    fontSize: 10,
    marginTop: 4,
  },
  toolsCard: {
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 12,
    marginBottom: 14,
  },
  toolsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolsTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  toolsHint: {
    color: '#9B94B8',
    fontSize: 10,
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  toolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2441',
    backgroundColor: '#171329',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  toolChipText: {
    color: '#DED8F6',
    fontSize: 11,
    fontWeight: '600',
  },
  toolsFooterRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  toolsFooterText: {
    color: '#958CB4',
    fontSize: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionCountBadge: {
    minWidth: 30,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2441',
    backgroundColor: '#151125',
    paddingHorizontal: 8,
  },
  sectionCountText: {
    color: '#E8E2FF',
    fontSize: 11,
    fontWeight: '700',
  },
  footerLoader: {
    marginTop: 6,
    marginBottom: 6,
  },
  endCard: {
    marginTop: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(134,239,172,0.16)',
    backgroundColor: 'rgba(134,239,172,0.05)',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  endCardText: {
    color: '#A8E9BC',
    fontSize: 11,
    fontWeight: '600',
  },
})
