import React, { useMemo } from 'react'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HeaderWithBack from '../../components/common/HeaderWithBack/HeaderWithBack'
import { Ionicons } from '../../utils/Icons'

type HistoryItem = {
  id: string
  title: string
  subtitle: string
  image: ImageSourcePropType
  watchedAt: string
  duration: string
  quality: 'HD' | 'Full HD' | '4K'
  progress: number
  type: 'Movie' | 'TV Show'
  episodeInfo?: string
}

type HistorySection = {
  title: string
  accent: string
  data: HistoryItem[]
}

const posterA = require('../../../assets/images/m1.png')
const posterB = require('../../../assets/images/detail.png')

const historySections: HistorySection[] = [
  {
    title: 'Today',
    accent: '#AB8BFF',
    data: [
      {
        id: 'h-1',
        title: 'Crimson Alley',
        subtitle: 'Crime Thriller',
        image: posterB,
        watchedAt: '10:42 PM',
        duration: '2h 06m',
        quality: '4K',
        progress: 94,
        type: 'Movie',
      },
      {
        id: 'h-2',
        title: 'Atlas Files',
        subtitle: 'Mystery Series',
        image: posterA,
        watchedAt: '8:15 PM',
        duration: '49 min',
        quality: 'Full HD',
        progress: 61,
        type: 'TV Show',
        episodeInfo: 'S2:E7 - The Fault Line',
      },
    ],
  },
  {
    title: 'Yesterday',
    accent: '#67E8F9',
    data: [
      {
        id: 'h-3',
        title: 'Dreamline',
        subtitle: 'Sci-Fi Adventure',
        image: posterB,
        watchedAt: '11:08 PM',
        duration: '52 min',
        quality: 'HD',
        progress: 100,
        type: 'TV Show',
        episodeInfo: 'S1:E10 - Burn Window',
      },
      {
        id: 'h-4',
        title: 'Midnight Echo',
        subtitle: 'Sci-Fi Drama',
        image: posterA,
        watchedAt: '9:03 PM',
        duration: '2h 08m',
        quality: '4K',
        progress: 47,
        type: 'Movie',
      },
    ],
  },
  {
    title: 'This Week',
    accent: '#FDE68A',
    data: [
      {
        id: 'h-5',
        title: 'Kitchen Rebels',
        subtitle: 'Reality Food Show',
        image: posterA,
        watchedAt: 'Monday | 7:20 PM',
        duration: '43 min',
        quality: 'HD',
        progress: 100,
        type: 'TV Show',
        episodeInfo: 'S4:E3 - Rush Hour',
      },
      {
        id: 'h-6',
        title: 'Silent Harbor',
        subtitle: 'Mystery Thriller',
        image: posterB,
        watchedAt: 'Sunday | 10:11 PM',
        duration: '1h 54m',
        quality: 'Full HD',
        progress: 76,
        type: 'Movie',
      },
    ],
  },
]

const HistoryScreen = () => {
  const stats = useMemo(() => {
    const allItems = historySections.flatMap(section => section.data)
    const completedCount = allItems.filter(item => item.progress >= 100).length
    const continueCount = allItems.filter(item => item.progress > 0 && item.progress < 100).length

    return {
      totalSessions: allItems.length,
      completedCount,
      continueCount,
      watchedHours: '11.4h',
    }
  }, [])

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const isCompleted = item.progress >= 100
    const typeColor = item.type === 'TV Show' ? '#8DE9F6' : '#FFB0CB'

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.poster} resizeMode="cover" />

        <View style={styles.cardContent}>
          <View style={styles.topRow}>
            <View style={styles.metaWrap}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>

            <View style={styles.qualityBadge}>
              <Text style={styles.qualityText}>{item.quality}</Text>
            </View>
          </View>

          <View style={styles.inlineRow}>
            <View style={styles.inlineItem}>
              <Ionicons name="time-outline" size={14} color="#A9A2C5" />
              <Text style={styles.inlineText}>{item.duration}</Text>
            </View>

            <View style={styles.inlineItem}>
              <Ionicons name="videocam-outline" size={14} color={typeColor} />
              <Text style={[styles.inlineText, { color: typeColor }]}>{item.type}</Text>
            </View>
          </View>

          {item.episodeInfo ? (
            <View style={styles.episodeRow}>
              <Ionicons name="play-forward-outline" size={13} color="#A9A2C5" />
              <Text numberOfLines={1} style={styles.episodeText}>
                {item.episodeInfo}
              </Text>
            </View>
          ) : null}

          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.max(0, Math.min(item.progress, 100))}%`,
                    backgroundColor: isCompleted ? '#86EFAC' : '#AB8BFF',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.bottomLeft}>
              <View style={[styles.statusChip, isCompleted ? styles.doneChip : styles.continueChip]}>
                <Ionicons
                  name={isCompleted ? 'checkmark-circle-outline' : 'play-circle-outline'}
                  size={13}
                  color={isCompleted ? '#9DF1B9' : '#D8CCFF'}
                />
                <Text style={[styles.statusText, isCompleted ? styles.doneText : styles.continueText]}>
                  {isCompleted ? 'Completed' : 'Continue Watching'}
                </Text>
              </View>

              <View style={styles.timeChip}>
                <Ionicons name="time-outline" size={12} color="#A9A2C5" />
                <Text style={styles.timeChipText}>{item.watchedAt}</Text>
              </View>
            </View>

            <Pressable style={styles.actionBtn}>
              <Ionicons
                name={isCompleted ? 'refresh-outline' : 'play-outline'}
                size={15}
                color="#fff"
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  const renderSectionHeader = ({ section }: { section: HistorySection }) => (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: section.accent }]} />
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={[styles.sectionCountBadge, { borderColor: `${section.accent}33` }]}>
        <Text style={styles.sectionCountText}>{section.data.length}</Text>
      </View>
    </View>
  )

  return (
    <HeaderWithBack headerTitle="History">
      <SectionList
        sections={historySections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={['#211337', '#0F0C1D', '#090713']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryHeader}>
                <View>
                  <Text style={styles.summaryLabel}>Watch History</Text>
                  <Text style={styles.summaryTitle}>Your recent sessions</Text>
                </View>
                <View style={styles.summaryBadge}>
                  <Ionicons name="time-outline" size={18} color="#D7CCFF" />
                </View>
              </View>

              <Text style={styles.summarySubtitle}>
                Resume faster and revisit what you watched across movies and TV shows.
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.totalSessions}</Text>
                  <Text style={styles.statLabel}>Sessions</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.continueCount}</Text>
                  <Text style={styles.statLabel}>In Progress</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.completedCount}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
              </View>

              <View style={styles.timeCard}>
                <View style={styles.timeRow}>
                  <Text style={styles.timeLabel}>Watch time this week</Text>
                  <Text style={styles.timeValue}>{stats.watchedHours}</Text>
                </View>
                <View style={styles.timeTrack}>
                  <View style={styles.timeFill} />
                </View>
                <Text style={styles.timeHint}>Keep going to unlock better recommendations</Text>
              </View>
            </LinearGradient>
          </>
        }
      />
    </HeaderWithBack>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 28,
  },
  summaryCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.14)',
    padding: 14,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#9D95BC',
    fontSize: 12,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  summaryBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(171, 139, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.15)',
  },
  summarySubtitle: {
    color: '#B7B0D4',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: '#B8B1D7',
    fontSize: 10,
    marginTop: 4,
  },
  timeCard: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: {
    color: '#C8C1E5',
    fontSize: 11,
  },
  timeValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  timeTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#241E39',
    overflow: 'hidden',
  },
  timeFill: {
    width: '64%',
    height: '100%',
    backgroundColor: '#AB8BFF',
    borderRadius: 999,
  },
  timeHint: {
    color: '#948CB4',
    fontSize: 10,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    marginTop: 2,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  sectionCountBadge: {
    minWidth: 28,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151125',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  sectionCountText: {
    color: '#E8E2FF',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0E0B1B',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 10,
  },
  poster: {
    width: 86,
    height: 118,
    borderRadius: 12,
    backgroundColor: '#171329',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  metaWrap: {
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
    borderWidth: 1,
    borderColor: '#2C2645',
    backgroundColor: '#1B1630',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qualityText: {
    color: '#E6E1FA',
    fontSize: 10,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 7,
    flexWrap: 'wrap',
  },
  inlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inlineText: {
    color: '#B2ABCF',
    fontSize: 11,
  },
  episodeRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
  },
  episodeText: {
    flex: 1,
    color: '#A9A2C5',
    fontSize: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
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
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  bottomLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  continueChip: {
    backgroundColor: 'rgba(171,139,255,0.05)',
    borderColor: 'rgba(171,139,255,0.14)',
  },
  doneChip: {
    backgroundColor: 'rgba(134,239,172,0.05)',
    borderColor: 'rgba(134,239,172,0.14)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  continueText: {
    color: '#D8CCFF',
  },
  doneText: {
    color: '#9DF1B9',
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#28213F',
    backgroundColor: '#151125',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  timeChipText: {
    color: '#A9A2C5',
    fontSize: 10,
    fontWeight: '600',
    flexShrink: 1,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1630',
    borderWidth: 1,
    borderColor: '#2C2645',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
