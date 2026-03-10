import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthLayout from './components/AuthLayout'
import AuthActionButton from './components/AuthActionButton'
import { COLORS } from '../../theme/colors'
import { useAuth } from '../../providers/AuthProvider'

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { signIn } = useAuth()

  return (
    <AuthLayout subtitle="streaming without ads">
      <AuthActionButton
        label="Sign up using Facebook"
        icon="logo-facebook"
        backgroundColor="#5B2DE1"
      />
      <AuthActionButton
        label="Sign up using Google"
        icon="logo-google"
        backgroundColor="#EE4D16"
      />
      <AuthActionButton
        label="Login with email"
        icon="mail-outline"
        backgroundColor="#FFFFFF"
        textColor="#161226"
        borderColor="rgba(255,255,255,0.85)"
        onPress={signIn}
      />

      <AuthActionButton
        label="Forgot Password"
        icon="key-outline"
        backgroundColor="rgba(255,255,255,0.06)"
        borderColor="rgba(171, 139, 255, 0.28)"
        onPress={() => navigation.navigate('ForgetPassword')}
      />

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}> Sign up</Text>
        </Pressable>
      </View>
    </AuthLayout>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  footerRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#D0C8EE',
    fontSize: 11,
    fontWeight: '500',
  },
  linkText: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '700',
  },
})
