import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons } from '../../../utils/Icons'
import {
  MediaTabKey,
  SavedMediaDataset,
  favouriteMediaData,
  watchlistMediaData,
} from '../data/savedMediaDummyData'
import MoviesSavedTab from './MoviesSavedTab'
import SavedMediaTopTabs from './SavedMediaTopTabs'
import TvShowsSavedTab from './TvShowsSavedTab'

type SavedMediaCollectionProps = {
  mode: 'favourite' | 'watchlist'
}

type ScreenCopy = {
  heroTitle: string
  heroSubtitle: string
  icon: string
  gradients: string[]
  highlight: string
  footerHint: string
}

const copyByMode: Record<SavedMediaCollectionProps['mode'], ScreenCopy> = {
  favourite: {
    heroTitle: 'Your Favorite Vault',
    heroSubtitle: 'Curated picks you loved, rewatched, and want close at hand.',
    icon: 'heart-outline',
    gradients: ['#26143A', '#120E25', '#0A0814'],
    highlight: 'Mood-based picks synced',
    footerHint: 'Personalized from your likes',
  },
  watchlist: {
    heroTitle: 'My Watchlist Queue',
    heroSubtitle: 'Everything you plan to watch next, split by movies and series.',
    icon: 'bookmark-outline',
    gradients: ['#13253A', '#101626', '#0A0814'],
    highlight: 'Queue updates across devices',
    footerHint: 'Plan your next binge night',
  },
}

const dataByMode: Record<SavedMediaCollectionProps['mode'], SavedMediaDataset> = {
  favourite: favouriteMediaData,
  watchlist: watchlistMediaData,
}

const SavedMediaCollection = ({ mode }: SavedMediaCollectionProps) => {
  const [activeTab, setActiveTab] = useState<MediaTabKey>('movies')
  const copy = copyByMode[mode]
  const data = dataByMode[mode]

  const stats = {
    totalTitles: data.movies.length + data.tvShows.length,
    averageMovieRating:
      data.movies.length > 0
        ? (data.movies.reduce((sum, item) => sum + item.rating, 0) / data.movies.length).toFixed(1)
        : '0.0',
    activeSeries: data.tvShows.filter(item => item.progress > 0).length,
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <LinearGradient
        colors={copy.gradients}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.heroBadge}>
            <Ionicons name={copy.icon as any} size={18} color="#E8E1FF" />
          </View>
          <View style={styles.heroTag}>
            <Ionicons name="sparkles-outline" size={12} color="#D7CBFF" />
            <Text style={styles.heroTagText}>{copy.highlight}</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>{copy.heroTitle}</Text>
        <Text style={styles.heroSubtitle}>{copy.heroSubtitle}</Text>

        <View style={styles.heroStatsRow}>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{stats.totalTitles}</Text>
            <Text style={styles.heroStatLabel}>Total Titles</Text>
          </View>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{data.movies.length}</Text>
            <Text style={styles.heroStatLabel}>Movies</Text>
          </View>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{data.tvShows.length}</Text>
            <Text style={styles.heroStatLabel}>TV Shows</Text>
          </View>
        </View>

        <View style={styles.heroFooter}>
          <View style={styles.heroFooterItem}>
            <Ionicons name="star-outline" size={14} color="#FDE68A" />
            <Text style={styles.heroFooterText}>Avg movie rating {stats.averageMovieRating}</Text>
          </View>
          <View style={styles.heroFooterDivider} />
          <View style={styles.heroFooterItem}>
            <Ionicons name="albums-outline" size={14} color="#A7F3D0" />
            <Text style={styles.heroFooterText}>
              {stats.activeSeries} active series | {copy.footerHint}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <SavedMediaTopTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        movieCount={data.movies.length}
        tvShowCount={data.tvShows.length}
      />

      {activeTab === 'movies' ? (
        <MoviesSavedTab items={data.movies} mode={mode} />
      ) : (
        <TvShowsSavedTab items={data.tvShows} mode={mode} />
      )}
    </ScrollView>
  )
}

export default SavedMediaCollection

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.14)',
    padding: 14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroTag: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  heroTagText: {
    color: '#DCD4FF',
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
    color: '#B7B0D4',
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
    paddingVertical: 10,
    alignItems: 'center',
  },
  heroStatValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  heroStatLabel: {
    color: '#B8B1D7',
    fontSize: 10,
    marginTop: 4,
  },
  heroFooter: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: 10,
    gap: 8,
  },
  heroFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  heroFooterText: {
    color: '#C8C1E5',
    fontSize: 11,
    flexShrink: 1,
  },
  heroFooterDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
})
