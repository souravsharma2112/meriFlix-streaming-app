import React from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../theme/colors'

const settingRows = [
  { title: 'Notifications', subtitle: 'New episodes and recommendations', icon: 'notifications-outline', withSwitch: true },
  { title: 'Auto Play', subtitle: 'Play next episode automatically', icon: 'play-circle-outline', withSwitch: true },
  { title: 'Streaming Quality', subtitle: 'High (Wi-Fi only)', icon: 'speedometer-outline' },
  { title: 'Language', subtitle: 'English', icon: 'language-outline' },
  { title: 'Privacy & Security', subtitle: 'Manage account permissions', icon: 'shield-checkmark-outline' },
  { title: 'Help Center', subtitle: 'FAQ and support', icon: 'help-circle-outline' },
]

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your meriFlix experience</Text>
        </View>

        <View style={styles.section}>
          {settingRows.map(item => (
            <Pressable key={item.title} style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon as any} size={18} color={COLORS.secondary} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
              </View>
              {item.withSwitch ? (
                <Switch
                  value={true}
                  onValueChange={() => {}}
                  thumbColor="#fff"
                  trackColor={{ false: '#3C3651', true: COLORS.secondary }}
                />
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#8E86B4" />
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>App Version</Text>
          <Text style={styles.infoValue}>meriFlix 1.0.0</Text>
          <Text style={styles.infoHint}>Built for a cinematic streaming experience</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen

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
  header: {
    marginBottom: 14,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A9A1C8',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    backgroundColor: '#0E0B1A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.12)',
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(171, 139, 255, 0.08)',
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  rowTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  rowSubtitle: {
    color: '#9890B6',
    fontSize: 11,
    marginTop: 2,
  },
  infoCard: {
    marginTop: 14,
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#100D21',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.1)',
  },
  infoTitle: {
    color: '#C8C0EA',
    fontSize: 12,
  },
  infoValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  infoHint: {
    color: '#8D86AE',
    fontSize: 11,
    marginTop: 2,
  },
})
