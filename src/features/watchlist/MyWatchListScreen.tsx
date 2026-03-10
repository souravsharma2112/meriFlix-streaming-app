import React from 'react'
import HeaderWithBack from '../../components/common/HeaderWithBack/HeaderWithBack'
import SavedMediaCollection from '../savedMedia/components/SavedMediaCollection'

const MyWatchListScreen = () => {
  return (
    <HeaderWithBack headerTitle="My Watchlist">
      <SavedMediaCollection mode="watchlist" />
    </HeaderWithBack>
  )
}

export default MyWatchListScreen
