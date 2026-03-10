import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../features/auth/LoginScreen'
import SignUpScreen from '../features/auth/SignUpScreen'
import ForgetPassword from '../features/auth/ForgetPassword'
import OTPScreen from '../features/auth/OTPScreen'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
