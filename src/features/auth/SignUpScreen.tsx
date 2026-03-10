import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthLayout from './components/AuthLayout'
import AuthActionButton from './components/AuthActionButton'
import AuthTextInput from './components/AuthTextInput'
import { COLORS } from '../../theme/colors'

const SignUpScreen = () => {
  const navigation = useNavigation<any>()

  return (
    <AuthLayout title="Create account" subtitle="Join meriFlix and start streaming">
      <AuthTextInput label="Full name" placeholder="Enter your full name" />
      <AuthTextInput
        label="Email address"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AuthTextInput
        label="Password"
        placeholder="Create password"
        secureTextEntry
      />

      <AuthActionButton
        label="Create Account"
        icon="person-add-outline"
        backgroundColor={COLORS.secondary}
        onPress={() => navigation.navigate('OTP')}
      />

      <View style={styles.row}>
        <Text style={styles.text}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}> Login</Text>
        </Pressable>
      </View>
    </AuthLayout>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  row: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#D0C8EE',
    fontSize: 12,
  },
  link: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
})
