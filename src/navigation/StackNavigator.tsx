import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './AuthNavigator'
import MovieDetails from '../features/movie/detailScreen/MovieDetails'
import ListingScreen from '../features/movie/listingScreen/ListingScreen'
import { useAuth } from '../providers/AuthProvider'
import MyWatchListScreen from '../features/watchlist/MyWatchListScreen'
import DownloadScreen from '../features/download/DownloadScreen'
import FavouriteScreen from '../features/favourite/FavouriteScreen'
import HistoryScreen from '../features/history/HistoryScreen'
import SearchScreen from '../features/search/SearchScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
        <Stack.Screen name="main" component={MainTabNavigator} />
        <Stack.Screen name="MovieDetail" component={MovieDetails} />
        <Stack.Screen name="listingScreen" component={ListingScreen}/>
        <Stack.Screen name="searchScreen" component={SearchScreen}/>
        <Stack.Screen name="favouriteScreen" component={FavouriteScreen}/>
        <Stack.Screen name="historyScreen" component={HistoryScreen}/>
        <Stack.Screen name="watchListScreen" component={MyWatchListScreen}/>
        <Stack.Screen name="downloadScreen" component={DownloadScreen}/>
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
