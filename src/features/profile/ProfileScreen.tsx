import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../theme/colors'
import { useAuth } from '../../providers/AuthProvider'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type ProfileMenuParamList = {
  favouriteScreen: undefined
  historyScreen: undefined
  watchListScreen: undefined
  downloadScreen: undefined
}

type ProfileMenuRoute = keyof ProfileMenuParamList

const quickStats = [
  { label: 'Watchlist', value: '24', icon: 'bookmark-outline' },
  { label: 'History', value: '128', icon: 'time-outline' },
  { label: 'Favorites', value: '36', icon: 'heart-outline' },
]

const menuItems: {
  title: string
  subtitle: string
  icon: string
  redirectTo: ProfileMenuRoute
}[] = [
  { title: 'Favourite', subtitle: 'Check your favourite', icon: 'heart-outline' , redirectTo : "favouriteScreen" },
  { title: 'History', subtitle: 'View your watch history', icon: 'time-outline' , redirectTo : "historyScreen" },
  { title: 'My Watchlist', subtitle: 'Continue where you left off', icon: 'film-outline' , redirectTo : "watchListScreen" },
  { title: 'Downloads', subtitle: 'Manage offline content', icon: 'download-outline' , redirectTo : "downloadScreen" },
  { title: 'Subscription', subtitle: 'Premium plan active', icon: 'card-outline' , redirectTo : "watchListScreen" },
]

const ProfileScreen = () => {
  const { signOut } = useAuth()
  const navigation = useNavigation<NavigationProp<ProfileMenuParamList>>()
  const handleNavigation = (redirectTo : ProfileMenuRoute) => {
    navigation.navigate(redirectTo)
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1B1435', '#0E0B1C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../../assets/images/logo2.png')}
              resizeMode="contain"
              style={styles.avatar}
            />
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.name}>meriFlix User</Text>
            <Text style={styles.email}>user@meriflix.app</Text>
          </View>
          <Pressable style={styles.editBtn}>
            <Ionicons name="create-outline" size={18} color={COLORS.white} />
          </Pressable>
        </LinearGradient>

        <View style={styles.statsRow}>
          {quickStats.map(item => (
            <View key={item.label} style={styles.statCard}>
              <Ionicons name={item.icon as any} size={18} color={COLORS.secondary} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map(item => (
          <Pressable key={item.title} style={styles.menuItem} onPress={() => handleNavigation(item.redirectTo)}>
            <View style={styles.menuIconWrap}>
              <Ionicons name={item.icon as any} size={18} color="#D8CCFF" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8D84B3" />
          </Pressable>
        ))}

        <Pressable onPress={signOut} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color="#FF7D7D" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
 
export default ProfileScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  hero: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.18)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
  },
  heroTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
  email: {
    color: '#ADA5CE',
    fontSize: 12,
    marginTop: 2,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#100D20',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.12)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  statLabel: {
    color: '#A39ABA',
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E0B1B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
    padding: 12,
    marginBottom: 10,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(171, 139, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  menuTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: '#9A91B8',
    fontSize: 11,
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,125,125,0.18)',
    backgroundColor: 'rgba(255,125,125,0.05)',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  logoutText: {
    color: '#FF9090',
    fontWeight: '700',
    fontSize: 14,
  },
})
