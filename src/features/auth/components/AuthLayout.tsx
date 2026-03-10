import React from 'react'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../../theme/colors'

interface AuthLayoutProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../../../../assets/images/authBg.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.92)', 'rgba(3,0,20,0.98)']}
          locations={[0, 0.5, 1]}
          style={styles.overlay}
        >
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.brandWrap}>
                <Image
                  source={require('../../../../assets/images/logo2.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Image
                  source={require('../../../../assets/images/meriFlix.png')}
                  style={styles.wordmark}
                  resizeMode="contain"
                />
                {!!subtitle && <Text style={styles.brandSubtitle}>{subtitle}</Text>}
              </View>

              <View style={styles.card}>
                {!!title && <Text style={styles.title}>{title}</Text>}
                {children}
              </View>

              {footer ? <View style={styles.footer}>{footer}</View> : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flex: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 28,
  },
  brandWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  wordmark: {
    width: 160,
    height: 60,
    marginBottom: 8,
  },
  brandSubtitle: {
    color: '#DDD5FF',
    fontSize: 12,
    opacity: 0.9,
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'rgba(14, 10, 28, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.18)',
    padding: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  footer: {
    marginTop: 14,
    alignItems: 'center',
  },
})
