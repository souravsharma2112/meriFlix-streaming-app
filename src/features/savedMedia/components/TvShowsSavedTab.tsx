import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '../../../utils/Icons'
import { SavedTvShowItem } from '../data/savedMediaDummyData'

type TvShowsSavedTabProps = {
  items: SavedTvShowItem[]
  mode: 'favourite' | 'watchlist'
}

const TvShowsSavedTab = ({ items, mode }: TvShowsSavedTabProps) => {
  const sectionTitle = mode === 'favourite' ? 'TV Show Favourites' : 'TV Show Watchlist'
  const sectionSubtitle =
    mode === 'favourite'
      ? 'Series you are actively following and loving.'
      : 'Shows lined up for your upcoming binge sessions.'
  const progressFillColor = mode === 'favourite' ? '#AB8BFF' : '#67E8F9'

  return (
    <View>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTextWrap}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          <Text style={styles.sectionSubtitle}>{sectionSubtitle}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{items.length}</Text>
        </View>
      </View>

      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.poster} resizeMode="cover" />

          <View style={styles.content}>
            <View style={styles.topRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.seasonInfo} | {item.year}
                </Text>
              </View>

              <View style={styles.qualityBadge}>
                <Text style={styles.qualityBadgeText}>{item.quality}</Text>
              </View>
            </View>

            <View style={styles.inlineRow}>
              <View style={styles.inlineItem}>
                <Ionicons name="play-circle-outline" size={14} color="#A9A2C5" />
                <Text style={styles.inlineText} numberOfLines={1}>
                  {item.nextEpisode}
                </Text>
              </View>
            </View>

            <View style={styles.inlineRow}>
              <View style={styles.inlineItem}>
                <Ionicons name="albums-outline" size={14} color="#A9A2C5" />
                <Text style={styles.inlineText}>
                  {item.episodesLeft} episodes left
                </Text>
              </View>

              <View style={styles.inlineItem}>
                <Ionicons name="sparkles-outline" size={14} color="#A9A2C5" />
                <Text style={styles.inlineText} numberOfLines={1}>
                  {item.badgeText}
                </Text>
              </View>
            </View>

            <View style={styles.genreRow}>
              {item.genres.slice(0, 2).map(genre => (
                <View key={`${item.id}-${genre}`} style={styles.genreChip}>
                  <Text style={styles.genreChipText}>{genre}</Text>
                </View>
              ))}
            </View>

            <View style={styles.progressWrap}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.max(0, Math.min(item.progress, 100))}%`,
                      backgroundColor: progressFillColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{item.progress}%</Text>
            </View>

            <View style={styles.captionRow}>
              <View
                style={[
                  styles.statusChip,
                  mode === 'watchlist' ? styles.statusChipWatchlist : styles.statusChipFavourite,
                ]}
              >
                <Ionicons
                  name={mode === 'favourite' ? 'heart-outline' : 'bookmark-outline'}
                  size={12}
                  color={mode === 'favourite' ? '#FF9CBD' : '#8DE9F6'}
                />
                <Text
                  style={[
                    styles.statusChipText,
                    mode === 'watchlist'
                      ? styles.statusChipTextWatchlist
                      : styles.statusChipTextFavourite,
                  ]}
                >
                  {mode === 'favourite' ? 'Loved Series' : 'Queued Series'}
                </Text>
              </View>
              <Text style={styles.captionText} numberOfLines={1}>
                {item.caption}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default TvShowsSavedTab

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#9B94B8',
    fontSize: 11,
    marginTop: 4,
  },
  countBadge: {
    minWidth: 32,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#151125',
    borderWidth: 1,
    borderColor: '#27203C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countBadgeText: {
    color: '#E8E2FF',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 10,
    marginBottom: 12,
  },
  poster: {
    width: 86,
    height: 124,
    borderRadius: 12,
    backgroundColor: '#171329',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'flex-start',
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9E96BE',
    fontSize: 11,
    marginTop: 3,
  },
  qualityBadge: {
    borderRadius: 10,
    backgroundColor: '#171329',
    borderWidth: 1,
    borderColor: '#2B2442',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qualityBadgeText: {
    color: '#E7E1FB',
    fontSize: 10,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  inlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minWidth: 0,
  },
  inlineText: {
    color: '#B2ABCF',
    fontSize: 11,
    flexShrink: 1,
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
    fontWeight: '500',
  },
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#241E39',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressText: {
    color: '#E6E1FA',
    fontSize: 11,
    fontWeight: '700',
    minWidth: 34,
    textAlign: 'right',
  },
  captionRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusChipFavourite: {
    backgroundColor: 'rgba(255,126,168,0.05)',
    borderColor: 'rgba(255,126,168,0.15)',
  },
  statusChipWatchlist: {
    backgroundColor: 'rgba(103,232,249,0.05)',
    borderColor: 'rgba(103,232,249,0.16)',
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusChipTextFavourite: {
    color: '#FFB0CB',
  },
  statusChipTextWatchlist: {
    color: '#A5F3FC',
  },
  captionText: {
    flex: 1,
    color: '#938AB2',
    fontSize: 10,
    textAlign: 'right',
  },
})
