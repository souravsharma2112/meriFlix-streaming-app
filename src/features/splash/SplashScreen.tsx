import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../theme/colors'

interface SplashScreenProps {
  onFinish: () => void
  durationMs?: number
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationMs = 2200,
}) => {
  const fade = useRef(new Animated.Value(0)).current
  const logoScale = useRef(new Animated.Value(0.86)).current
  const logoY = useRef(new Animated.Value(20)).current
  const logoRotate = useRef(new Animated.Value(0)).current
  const subtitleFade = useRef(new Animated.Value(0)).current
  const glowPulse = useRef(new Animated.Value(0.5)).current
  const shimmerX = useRef(new Animated.Value(-180)).current
  const orbit = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const intro = Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 45,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(logoY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(subtitleFade, {
        toValue: 1,
        duration: 650,
        delay: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ])

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.55,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    )

    const orbitLoop = Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )

    const shimmerLoop = Animated.loop(
      Animated.timing(shimmerX, {
        toValue: 220,
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    )

    intro.start()
    glowLoop.start()
    orbitLoop.start()
    shimmerLoop.start()

    const finishTimer = setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onFinish()
      })
    }, durationMs)

    return () => {
      clearTimeout(finishTimer)
      glowLoop.stop()
      orbitLoop.stop()
      shimmerLoop.stop()
      intro.stop()
    }
  }, [
    durationMs,
    fade,
    glowPulse,
    logoRotate,
    logoScale,
    logoY,
    onFinish,
    orbit,
    shimmerX,
    subtitleFade,
  ])

  const spin = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const logoTilt = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '0deg'],
  })

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../../../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(3,0,20,0.88)', 'rgba(3,0,20,0.96)', COLORS.primary]}
          style={styles.overlay}
        >
          <Animated.View style={[styles.root, { opacity: fade }]}>
            <Animated.View
              style={[
                styles.orbitWrap,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            >
              <View style={[styles.orbitDot, styles.orbitDotPrimary]} />
              <View style={[styles.orbitDot, styles.orbitDotSecondary]} />
            </Animated.View>

            <Animated.View
              style={[
                styles.glow,
                {
                  opacity: glowPulse,
                  transform: [{ scale: glowPulse }],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.brandCard,
                {
                  transform: [
                    { translateY: logoY },
                    { scale: logoScale },
                    { rotate: logoTilt },
                  ],
                },
              ]}
            >
              <Image
                source={require('../../../assets/images/logo2.png')}
                resizeMode="contain"
                style={styles.logo}
              />
              <Image
                source={require('../../../assets/images/meriFlix.png')}
                resizeMode="contain"
                style={styles.wordmark}
              />
              <Text style={styles.tagline}>Stream the moments that matter</Text>
            </Animated.View>

            <Animated.View style={[styles.loadingTrack, { opacity: subtitleFade }]}>
              <Animated.View
                style={[
                  styles.shimmer,
                  {
                    transform: [{ translateX: shimmerX }],
                  },
                ]}
              />
            </Animated.View>

            <Animated.View style={[styles.footerRow, { opacity: subtitleFade }]}>
              <Ionicons name="sparkles" size={14} color={COLORS.secondary} />
              <Text style={styles.footerText}>Cinematic streaming experience</Text>
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.22,
  },
  overlay: {
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  orbitWrap: {
    position: 'absolute',
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  orbitDotPrimary: {
    backgroundColor: COLORS.secondary,
    top: 8,
    left: 122,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  orbitDotSecondary: {
    backgroundColor: '#FF5F8A',
    bottom: 18,
    right: 44,
    shadowColor: '#FF5F8A',
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  glow: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: COLORS.secondary,
    opacity: 0.2,
  },
  brandCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.25)',
    backgroundColor: 'rgba(17, 12, 37, 0.72)',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  logo: {
    width: 76,
    height: 76,
    marginBottom: 14,
  },
  wordmark: {
    width: 170,
    height: 38,
    marginBottom: 10,
  },
  tagline: {
    color: '#C9C1E4',
    fontSize: 13,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  loadingTrack: {
    width: 190,
    height: 4,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 28,
  },
  shimmer: {
    width: 120,
    height: '100%',
    backgroundColor: COLORS.secondary,
    opacity: 0.9,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    color: '#B1A8D3',
    fontSize: 12,
    fontWeight: '600',
  },
})
