import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabNavigator from './MainTabNavigator'
import MovieDetails from '../features/movie/movieDetails/MovieDetails'
import MovieDetails2 from '../features/movie/movieDetails2/MovieDetails2'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="main" component={MainTabNavigator} />
        <Stack.Screen name="MovieDetail" component={MovieDetails} />
        <Stack.Screen name="MovieDetail2" component={MovieDetails2} />
    </Stack.Navigator>
  )
}

export default StackNavigator