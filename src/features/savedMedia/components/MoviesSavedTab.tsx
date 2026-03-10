import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons } from '../../../utils/Icons'
import { SavedMovieItem } from '../data/savedMediaDummyData'

type MoviesSavedTabProps = {
  items: SavedMovieItem[]
  mode: 'favourite' | 'watchlist'
}

const MoviesSavedTab = ({ items, mode }: MoviesSavedTabProps) => {
  const sectionTitle = mode === 'favourite' ? 'Movie Favourites' : 'Movie Watchlist'
  const sectionSubtitle =
    mode === 'favourite'
      ? 'Handpicked titles you keep coming back to.'
      : 'Queued movies ready for your next session.'

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

      <View style={styles.grid}>
        {items.map(item => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={item.image}
              style={styles.poster}
              imageStyle={styles.posterImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.06)', 'rgba(3,0,20,0.92)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />

              <View style={styles.posterTopRow}>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText} numberOfLines={1}>
                    {item.badgeText}
                  </Text>
                </View>
                <View style={styles.iconPill}>
                  <Ionicons
                    name={mode === 'favourite' ? 'heart' : 'bookmark'}
                    size={13}
                    color={mode === 'favourite' ? '#FF7EA8' : '#A7F3D0'}
                  />
                </View>
              </View>

              <View style={styles.posterBottomRow}>
                <View style={styles.smallPill}>
                  <Text style={styles.smallPillText}>{item.quality}</Text>
                </View>
                <Text style={styles.yearText}>{item.year}</Text>
              </View>
            </ImageBackground>

            <View style={styles.cardBody}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.caption} numberOfLines={1}>
                {item.caption}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={13} color="#A9A2C5" />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={13} color="#FBBF24" />
                  <Text style={styles.metaText}>{item.rating.toFixed(1)}</Text>
                </View>
              </View>

              <View style={styles.genreRow}>
                {item.genres.slice(0, 2).map(genre => (
                  <View key={`${item.id}-${genre}`} style={styles.genreChip}>
                    <Text style={styles.genreChipText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default MoviesSavedTab

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48.5%',
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: '#0E0B1B',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    overflow: 'hidden',
  },
  poster: {
    height: 150,
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
    gap: 8,
  },
  badgePill: {
    flex: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(3, 0, 20, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgePillText: {
    color: '#FFF3FF',
    fontSize: 10,
    fontWeight: '600',
  },
  iconPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(3, 0, 20, 0.64)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  posterBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(3, 0, 20, 0.66)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  smallPillText: {
    color: '#EDE8FF',
    fontSize: 10,
    fontWeight: '700',
  },
  yearText: {
    color: '#F2EEFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    padding: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  caption: {
    color: '#9E96BE',
    fontSize: 10,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: '#D8D2EE',
    fontSize: 10,
    fontWeight: '600',
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
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
})
