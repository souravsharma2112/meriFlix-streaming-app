import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabNavigator from './MainTabNavigator'
import MovieDetails from '../features/movieDetails/MovieDetails'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="main" component={MainTabNavigator} />
        <Stack.Screen name="MovieDetail" component={MovieDetails} />
    </Stack.Navigator>
  )
}

export default StackNavigator