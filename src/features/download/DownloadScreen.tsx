import React from 'react'
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import HeaderWithBack from '../../components/common/HeaderWithBack/HeaderWithBack'
import { Ionicons } from '../../utils/Icons'

type DownloadItem = {
  id: string
  title: string
  subtitle: string
  size: string
  quality: string
  progress: number
  duration: string
  status: 'downloading' | 'queued' | 'downloaded' | 'paused'
  image: ImageSourcePropType
}

const downloadMovies: DownloadItem[] = [
  {
    id: '1',
    title: 'The Silent Horizon',
    subtitle: 'Sci-Fi - Episode 4',
    size: '1.2 GB',
    quality: '4K',
    progress: 78,
    duration: '48 min',
    status: 'downloading',
    image: require('../../../assets/images/m1.png'),
  },
  {
    id: '2',
    title: 'Crimson Alley',
    subtitle: 'Crime - Movie',
    size: '860 MB',
    quality: 'HD',
    progress: 100,
    duration: '2h 06m',
    status: 'downloaded',
    image: require('../../../assets/images/detail.png'),
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    subtitle: 'Thriller - Episode 9',
    size: '940 MB',
    quality: 'HD',
    progress: 42,
    duration: '52 min',
    status: 'paused',
    image: require('../../../assets/images/m1.png'),
  },
  {
    id: '4',
    title: 'Midnight Atlas',
    subtitle: 'Adventure - Movie',
    size: '1.5 GB',
    quality: '4K',
    progress: 12,
    duration: '1h 58m',
    status: 'queued',
    image: require('../../../assets/images/detail.png'),
  },
]

const statusMap: Record<
  DownloadItem['status'],
  { label: string; color: string; icon: string }
> = {
  downloading: { label: 'Downloading', color: '#67E8F9', icon: 'cloud-download-outline' },
  queued: { label: 'Queued', color: '#FDE68A', icon: 'time-outline' },
  downloaded: { label: 'Ready Offline', color: '#86EFAC', icon: 'checkmark-circle-outline' },
  paused: { label: 'Paused', color: '#FDBA74', icon: 'pause-circle-outline' },
}

const DownloadScreen = () => {
  const totalDownloads = downloadMovies.length
  const completedDownloads = downloadMovies.filter(item => item.status === 'downloaded').length
  const usedStorage = '4.5 GB'
  const freeStorage = '11.8 GB'

  const renderItem = ({ item }: { item: DownloadItem }) => {
    const status = statusMap[item.status]
    const isComplete = item.progress >= 100 || item.status === 'downloaded'

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.poster} resizeMode="cover" />

        <View style={styles.cardContent}>
          <View style={styles.topRow}>
            <View style={styles.metaWrap}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            <View style={[styles.qualityBadge, isComplete && styles.qualityBadgeDone]}>
              <Text style={styles.qualityText}>{item.quality}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.inlineItem}>
              <Ionicons name="film-outline" size={14} color="#A9A2C5" />
              <Text style={styles.infoText}>{item.duration}</Text>
            </View>
            <View style={styles.inlineItem}>
              <Ionicons name="server-outline" size={14} color="#A9A2C5" />
              <Text style={styles.infoText}>{item.size}</Text>
            </View>
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(item.progress, 100)}%` },
                  isComplete && styles.progressFillDone,
                ]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}%</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={[styles.statusChip, { borderColor: `${status.color}33` }]}>
              <Ionicons name={status.icon as any} size={14} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>

            <Pressable style={styles.actionBtn}>
              <Ionicons
                name={isComplete ? 'play-outline' : item.status === 'paused' ? 'play' : 'pause'}
                size={16}
                color="#fff"
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  return (
    <HeaderWithBack headerTitle={'Downloads'}>
      <FlatList
        data={downloadMovies}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <View>
                  <Text style={styles.summaryLabel}>Offline Library</Text>
                  <Text style={styles.summaryTitle}>{totalDownloads} downloads saved</Text>
                </View>
                <View style={styles.circleBadge}>
                  <Ionicons name="download-outline" size={18} color="#D7CCFF" />
                </View>
              </View>

              <View style={styles.storageCard}>
                <View style={styles.storageRow}>
                  <Text style={styles.storageText}>Storage used</Text>
                  <Text style={styles.storageTextStrong}>{usedStorage}</Text>
                </View>
                <View style={styles.storageTrack}>
                  <View style={styles.storageFill} />
                </View>
                <View style={styles.storageRow}>
                  <Text style={styles.storageHint}>{completedDownloads} ready offline</Text>
                  <Text style={styles.storageHint}>{freeStorage} free</Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <Pressable style={[styles.primaryAction, styles.actionFlex]}>
                  <Ionicons name="play-circle-outline" size={17} color="#fff" />
                  <Text style={styles.primaryActionText}>Resume All</Text>
                </Pressable>
                <Pressable style={[styles.secondaryAction, styles.actionFlex]}>
                  <Ionicons name="trash-outline" size={16} color="#D6D0EF" />
                  <Text style={styles.secondaryActionText}>Manage</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Current Downloads</Text>
              <Text style={styles.sectionCount}>{downloadMovies.length}</Text>
            </View>
          </>
        }
      />
    </HeaderWithBack>
  )
}

export default DownloadScreen

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 28,
  },
  summaryCard: {
    backgroundColor: '#0E0B1B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.12)',
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
  circleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(171, 139, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.15)',
  },
  storageCard: {
    marginTop: 14,
    backgroundColor: '#161226',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#221D35',
    padding: 12,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageText: {
    color: '#B1AACE',
    fontSize: 12,
  },
  storageTextStrong: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  storageTrack: {
    marginTop: 10,
    marginBottom: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#231D38',
    overflow: 'hidden',
  },
  storageFill: {
    width: '38%',
    height: '100%',
    backgroundColor: '#AB8BFF',
    borderRadius: 6,
  },
  storageHint: {
    color: '#9289B3',
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionFlex: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryAction: {
    backgroundColor: '#E50914',
  },
  primaryActionText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryAction: {
    backgroundColor: '#171329',
    borderWidth: 1,
    borderColor: '#2A2441',
  },
  secondaryActionText: {
    color: '#D6D0EF',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionCount: {
    color: '#CFC7EE',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#171329',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#292242',
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
    height: 112,
    borderRadius: 12,
    backgroundColor: '#1B1630',
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
    backgroundColor: '#1B1630',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C2645',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qualityBadgeDone: {
    backgroundColor: 'rgba(134,239,172,0.08)',
    borderColor: 'rgba(134,239,172,0.22)',
  },
  qualityText: {
    color: '#E6E1FA',
    fontSize: 10,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  inlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    color: '#A9A2C5',
    fontSize: 11,
  },
  progressWrap: {
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
    backgroundColor: '#7DD3FC',
  },
  progressFillDone: {
    backgroundColor: '#86EFAC',
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
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
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
