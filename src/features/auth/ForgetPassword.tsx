import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthLayout from './components/AuthLayout'
import AuthActionButton from './components/AuthActionButton'
import AuthTextInput from './components/AuthTextInput'
import { COLORS } from '../../theme/colors'

const ForgetPassword = () => {
  const navigation = useNavigation<any>()

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we will send a verification code"
    >
      <AuthTextInput
        label="Email address"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AuthActionButton
        label="Send OTP Code"
        icon="paper-plane-outline"
        backgroundColor={COLORS.secondary}
        onPress={() => navigation.navigate('OTP')}
      />

      <Pressable style={styles.linkWrap} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </Pressable>
    </AuthLayout>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  linkWrap: {
    alignSelf: 'center',
    marginTop: 2,
  },
  link: {
    color: '#D8D0F7',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
})
