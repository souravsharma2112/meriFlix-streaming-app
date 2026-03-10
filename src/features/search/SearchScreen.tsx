import React, { useMemo, useState } from 'react'
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HeaderWithBack from '../../components/common/HeaderWithBack/HeaderWithBack'
import SearchBar from '../../components/SearchBar'
import { Ionicons } from '../../utils/Icons'

type SearchFilterKey = 'all' | 'movie' | 'tv' | 'trending'

type SearchResultItem = {
  id: string
  title: string
  subtitle: string
  type: 'Movie' | 'TV Show'
  year: number
  duration: string
  quality: 'HD' | 'Full HD' | '4K'
  image: ImageSourcePropType
  rating: number
  genres: string[]
  badge: string
  trendScore: number
}

const posterA = require('../../../assets/images/m1.png')
const posterB = require('../../../assets/images/detail.png')
const heroBg = require('../../../assets/images/homebg.png')

const filterOptions: { key: SearchFilterKey; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: 'grid-outline' },
  { key: 'movie', label: 'Movies', icon: 'film-outline' },
  { key: 'tv', label: 'TV Shows', icon: 'tv-outline' },
  { key: 'trending', label: 'Trending', icon: 'flame-outline' },
]

const trendingTopics = ['Sci-Fi', 'Crime', 'K-Drama', 'Anime', 'Mystery', 'Comedy']
const recentSearches = ['Midnight Echo', 'Atlas Files', 'Thriller', '4K action']

const searchResultsData: SearchResultItem[] = [
  {
    id: 's-1',
    title: 'Midnight Echo',
    subtitle: 'Neon city signals trigger a hidden rebellion',
    type: 'Movie',
    year: 2024,
    duration: '2h 08m',
    quality: '4K',
    image: posterA,
    rating: 8.8,
    genres: ['Sci-Fi', 'Drama'],
    badge: 'Top Match',
    trendScore: 96,
  },
  {
    id: 's-2',
    title: 'Atlas Files',
    subtitle: 'A case-of-the-week thriller with long-form mystery arcs',
    type: 'TV Show',
    year: 2024,
    duration: '49 min',
    quality: 'Full HD',
    image: posterB,
    rating: 8.4,
    genres: ['Mystery', 'Thriller'],
    badge: 'Binge Pick',
    trendScore: 92,
  },
  {
    id: 's-3',
    title: 'Silent Harbor',
    subtitle: 'A coastal town hides a decade-old disappearance',
    type: 'Movie',
    year: 2023,
    duration: '1h 54m',
    quality: 'Full HD',
    image: posterB,
    rating: 8.1,
    genres: ['Crime', 'Mystery'],
    badge: 'Critic Favorite',
    trendScore: 89,
  },
  {
    id: 's-4',
    title: 'Dreamline',
    subtitle: 'Explorers jump through unstable dream corridors',
    type: 'TV Show',
    year: 2023,
    duration: '52 min',
    quality: 'HD',
    image: posterA,
    rating: 8.6,
    genres: ['Sci-Fi', 'Adventure'],
    badge: 'Trending',
    trendScore: 94,
  },
  {
    id: 's-5',
    title: 'Crimson Alley',
    subtitle: 'An undercover detective gets trapped in his own operation',
    type: 'Movie',
    year: 2022,
    duration: '2h 06m',
    quality: '4K',
    image: posterB,
    rating: 8.0,
    genres: ['Crime', 'Action'],
    badge: 'For You',
    trendScore: 85,
  },
  {
    id: 's-6',
    title: 'Kitchen Rebels',
    subtitle: 'Chaotic kitchen challenges with elite chefs',
    type: 'TV Show',
    year: 2022,
    duration: '43 min',
    quality: 'HD',
    image: posterA,
    rating: 7.9,
    genres: ['Reality', 'Food'],
    badge: 'Weekly Hit',
    trendScore: 80,
  },
]

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<SearchFilterKey>('all')

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return searchResultsData.filter(item => {
      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'movie'
            ? item.type === 'Movie'
            : activeFilter === 'tv'
              ? item.type === 'TV Show'
              : item.trendScore >= 88

      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : [
              item.title,
              item.subtitle,
              item.type,
              item.quality,
              ...item.genres,
              item.year.toString(),
            ]
              .join(' ')
              .toLowerCase()
              .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  const trendingCount = searchResultsData.filter(item => item.trendScore >= 88).length

  const renderResultCard = (item: SearchResultItem) => {
    const typeAccent = item.type === 'TV Show' ? '#8DE9F6' : '#FFB0CB'

    return (
      <Pressable key={item.id} style={styles.resultCard}>
        <Image source={item.image} style={styles.poster} resizeMode="cover" />

        <View style={styles.resultContent}>
          <View style={styles.resultTopRow}>
            <View style={styles.resultMetaWrap}>
              <Text style={styles.resultTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.resultSubtitle} numberOfLines={2}>
                {item.subtitle}
              </Text>
            </View>

            <View style={styles.qualityBadge}>
              <Text style={styles.qualityBadgeText}>{item.quality}</Text>
            </View>
          </View>

          <View style={styles.inlineMetaRow}>
            <View style={styles.inlineMetaItem}>
              <Ionicons name="calendar-outline" size={13} color="#A9A2C5" />
              <Text style={styles.inlineMetaText}>{item.year}</Text>
            </View>
            <View style={styles.inlineMetaItem}>
              <Ionicons name="time-outline" size={13} color="#A9A2C5" />
              <Text style={styles.inlineMetaText}>{item.duration}</Text>
            </View>
            <View style={styles.inlineMetaItem}>
              <Ionicons name="star" size={13} color="#FBBF24" />
              <Text style={styles.inlineMetaText}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.inlineMetaRow}>
            <View style={[styles.typeChip, { borderColor: `${typeAccent}22` }]}>
              <Ionicons
                name={item.type === 'TV Show' ? 'tv-outline' : 'film-outline'}
                size={12}
                color={typeAccent}
              />
              <Text style={[styles.typeChipText, { color: typeAccent }]}>{item.type}</Text>
            </View>

            <View style={styles.badgeChip}>
              <Ionicons name="sparkles-outline" size={12} color="#D9CBFF" />
              <Text style={styles.badgeChipText}>{item.badge}</Text>
            </View>
          </View>

          <View style={styles.genreRow}>
            {item.genres.slice(0, 2).map(genre => (
              <View key={`${item.id}-${genre}`} style={styles.genreChip}>
                <Text style={styles.genreChipText}>{genre}</Text>
              </View>
            ))}
            <View style={styles.trendChip}>
              <Ionicons name="trending-up-outline" size={12} color="#A5F3FC" />
              <Text style={styles.trendChipText}>{item.trendScore}%</Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <HeaderWithBack headerTitle="Search">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      >
        <ImageBackground source={heroBg} style={styles.heroBg} imageStyle={styles.heroBgImage}>
          <LinearGradient
            colors={['rgba(7,4,20,0.45)', 'rgba(7,4,20,0.92)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroOverlay}
          >
            <View style={styles.heroTopRow}>
              <View style={styles.heroBadge}>
                <Ionicons name="search-outline" size={18} color="#E8E1FF" />
              </View>
              <View style={styles.heroChip}>
                <Ionicons name="sparkles-outline" size={12} color="#D7CBFF" />
                <Text style={styles.heroChipText}>Discover faster</Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>Find your next watch in seconds</Text>
            <Text style={styles.heroSubtitle}>
              Search across movies and TV shows with quick filters, trending picks, and recent topics.
            </Text>

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>{searchResultsData.length}</Text>
                <Text style={styles.heroStatLabel}>Featured</Text>
              </View>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>{trendingCount}</Text>
                <Text style={styles.heroStatLabel}>Trending</Text>
              </View>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>{recentSearches.length}</Text>
                <Text style={styles.heroStatLabel}>Recent</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.searchBarWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search movies, TV shows, genres..."
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        <View style={styles.panelCard}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Filters</Text>
            <Text style={styles.rowHint}>Tap to narrow results</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalChipsWrap}
          >
            {filterOptions.map(option => {
              const isActive = activeFilter === option.key
              return (
                <Pressable
                  key={option.key}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setActiveFilter(option.key)}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={13}
                    color={isActive ? '#171329' : '#D8D2EE'}
                  />
                  <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                    {option.label}
                  </Text>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.rowGrid}>
          <View style={[styles.miniPanel, styles.flex1]}>
            <View style={styles.miniPanelHeader}>
              <Ionicons name="trending-up-outline" size={15} color="#8DE9F6" />
              <Text style={styles.miniPanelTitle}>Trending Searches</Text>
            </View>
            <View style={styles.miniChipsWrap}>
              {trendingTopics.slice(0, 4).map(topic => (
                <Pressable key={topic} style={styles.miniChip} onPress={() => setQuery(topic)}>
                  <Text style={styles.miniChipText}>{topic}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={[styles.miniPanel, styles.flex1]}>
            <View style={styles.miniPanelHeader}>
              <Ionicons name="time-outline" size={15} color="#FFB0CB" />
              <Text style={styles.miniPanelTitle}>Recent</Text>
            </View>
            <View style={styles.recentList}>
              {recentSearches.slice(0, 3).map(item => (
                <Pressable key={item} style={styles.recentRow} onPress={() => setQuery(item)}>
                  <Ionicons name="return-up-forward-outline" size={12} color="#A9A2C5" />
                  <Text style={styles.recentRowText} numberOfLines={1}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.resultsHeader}>
          <View>
            <Text style={styles.resultsTitle}>
              {query.trim() ? 'Search Results' : 'Suggested Results'}
            </Text>
            <Text style={styles.resultsSubtitle}>
              {query.trim()
                ? `Showing matches for "${query.trim()}"`
                : 'Personalized picks based on your recent activity'}
            </Text>
          </View>
          <View style={styles.resultsCountBadge}>
            <Text style={styles.resultsCountText}>{filteredResults.length}</Text>
          </View>
        </View>

        {filteredResults.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search-outline" size={18} color="#D8CCFF" />
            </View>
            <Text style={styles.emptyTitle}>No matches found</Text>
            <Text style={styles.emptySubtitle}>
              Try another keyword like "crime", "sci-fi", or switch the filter.
            </Text>
            <Pressable
              style={styles.emptyAction}
              onPress={() => {
                setQuery('')
                setActiveFilter('all')
              }}
            >
              <Ionicons name="refresh-outline" size={14} color="#fff" />
              <Text style={styles.emptyActionText}>Reset Search</Text>
            </Pressable>
          </View>
        ) : (
          filteredResults.map(renderResultCard)
        )}
      </ScrollView>
    </HeaderWithBack>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 28,
  },
  heroBg: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.14)',
  },
  heroBgImage: {
    borderRadius: 20,
  },
  heroOverlay: {
    padding: 14,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroChipText: {
    color: '#E0D6FF',
    fontSize: 11,
    fontWeight: '600',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  heroSubtitle: {
    color: '#C5BEDF',
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
  searchBarWrap: {
    marginTop: 14,
  },
  panelCard: {
    marginTop: 14,
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 12,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  rowTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  rowHint: {
    color: '#9B94B8',
    fontSize: 10,
  },
  horizontalChipsWrap: {
    gap: 8,
    paddingTop: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2441',
    backgroundColor: '#171329',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  filterChipActive: {
    backgroundColor: '#D9CBFF',
    borderColor: '#D9CBFF',
  },
  filterChipText: {
    color: '#DED8F6',
    fontSize: 11,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#171329',
    fontWeight: '700',
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  flex1: {
    flex: 1,
  },
  miniPanel: {
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 12,
  },
  miniPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniPanelTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  miniChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  miniChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#28213F',
    backgroundColor: '#151125',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  miniChipText: {
    color: '#CFC8EA',
    fontSize: 10,
    fontWeight: '600',
  },
  recentList: {
    marginTop: 10,
    gap: 8,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
  },
  recentRowText: {
    flex: 1,
    color: '#B9B2D5',
    fontSize: 10,
  },
  resultsHeader: {
    marginTop: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  resultsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultsSubtitle: {
    color: '#9B94B8',
    fontSize: 11,
    marginTop: 4,
    maxWidth: 260,
  },
  resultsCountBadge: {
    minWidth: 30,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151125',
    borderWidth: 1,
    borderColor: '#2A2441',
    paddingHorizontal: 8,
  },
  resultsCountText: {
    color: '#E8E2FF',
    fontSize: 11,
    fontWeight: '700',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 10,
    marginBottom: 12,
  },
  poster: {
    width: 88,
    height: 124,
    borderRadius: 12,
    backgroundColor: '#171329',
  },
  resultContent: {
    flex: 1,
    marginLeft: 12,
  },
  resultTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  resultMetaWrap: {
    flex: 1,
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  resultSubtitle: {
    color: '#9E96BE',
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  qualityBadge: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C2645',
    backgroundColor: '#1B1630',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qualityBadgeText: {
    color: '#E6E1FA',
    fontSize: 10,
    fontWeight: '700',
  },
  inlineMetaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
    alignItems: 'center',
  },
  inlineMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inlineMetaText: {
    color: '#B1AACE',
    fontSize: 10,
    fontWeight: '600',
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  typeChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(171,139,255,0.15)',
    backgroundColor: 'rgba(171,139,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeChipText: {
    color: '#D9CBFF',
    fontSize: 10,
    fontWeight: '700',
  },
  genreRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  trendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(103,232,249,0.16)',
    backgroundColor: 'rgba(103,232,249,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trendChipText: {
    color: '#A5F3FC',
    fontSize: 10,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.12)',
    backgroundColor: '#0E0B1B',
    padding: 16,
    alignItems: 'center',
  },
  emptyIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(171,139,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(171,139,255,0.12)',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
  },
  emptySubtitle: {
    color: '#A59EC1',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 17,
  },
  emptyAction: {
    marginTop: 12,
    backgroundColor: '#E50914',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emptyActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
})
