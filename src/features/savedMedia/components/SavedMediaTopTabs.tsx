import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MediaTabKey } from '../data/savedMediaDummyData'

type SavedMediaTopTabsProps = {
  activeTab: MediaTabKey
  onChangeTab: (tab: MediaTabKey) => void
  movieCount: number
  tvShowCount: number
}

const tabItems: { key: MediaTabKey; label: string }[] = [
  { key: 'movies', label: 'Movies' },
  { key: 'tvShows', label: 'TV Shows' },
]

const SavedMediaTopTabs = ({
  activeTab,
  onChangeTab,
  movieCount,
  tvShowCount,
}: SavedMediaTopTabsProps) => {
  return (
    <View style={styles.wrapper}>
      {tabItems.map(item => {
        const isActive = activeTab === item.key
        const count = item.key === 'movies' ? movieCount : tvShowCount

        return (
          <Pressable
            key={item.key}
            style={styles.tabHit}
            onPress={() => onChangeTab(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            {isActive ? (
              <LinearGradient
                colors={['#D9CBFF', '#AB8BFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.activeTab}
              >
                <Text style={styles.activeLabel}>{item.label}</Text>
                <View style={styles.activeCount}>
                  <Text style={styles.activeCountText}>{count}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTab}>
                <Text style={styles.inactiveLabel}>{item.label}</Text>
                <View style={styles.inactiveCount}>
                  <Text style={styles.inactiveCountText}>{count}</Text>
                </View>
              </View>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

export default SavedMediaTopTabs

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    padding: 6,
    borderRadius: 18,
    backgroundColor: '#0E0B1B',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    marginBottom: 14,
  },
  tabHit: {
    flex: 1,
  },
  activeTab: {
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inactiveTab: {
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151125',
    borderWidth: 1,
    borderColor: '#241D38',
  },
  activeLabel: {
    color: '#171329',
    fontSize: 13,
    fontWeight: '700',
  },
  inactiveLabel: {
    color: '#DED8F6',
    fontSize: 13,
    fontWeight: '600',
  },
  activeCount: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 19, 41, 0.14)',
    paddingHorizontal: 7,
  },
  inactiveCount: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201A33',
    paddingHorizontal: 7,
  },
  activeCountText: {
    color: '#171329',
    fontSize: 11,
    fontWeight: '700',
  },
  inactiveCountText: {
    color: '#CFC7EE',
    fontSize: 11,
    fontWeight: '700',
  },
})
