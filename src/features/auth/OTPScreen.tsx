import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthLayout from './components/AuthLayout'
import AuthActionButton from './components/AuthActionButton'
import AuthTextInput from './components/AuthTextInput'
import { COLORS } from '../../theme/colors'
import { useAuth } from '../../providers/AuthProvider'

const OTPScreen = () => {
  const navigation = useNavigation<any>()
  const { signIn } = useAuth()

  return (
    <AuthLayout title="Verify OTP" subtitle="Enter the 6-digit code sent to your email">
      <View style={styles.otpRow}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.otpBox}>
            <Text style={styles.otpText}>*</Text>
          </View>
        ))}
      </View>

      <AuthTextInput
        label="OTP Code"
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        maxLength={6}
      />

      <AuthActionButton
        label="Verify & Continue"
        icon="shield-checkmark-outline"
        backgroundColor={COLORS.secondary}
        onPress={signIn}
      />

      <Pressable style={styles.resendWrap} onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.resendText}>
          Didn&apos;t receive code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </Pressable>
    </AuthLayout>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.35)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 22,
  },
  resendWrap: {
    marginTop: 2,
    alignItems: 'center',
  },
  resendText: {
    color: '#CFC7EE',
    fontSize: 12,
  },
  resendLink: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
})

