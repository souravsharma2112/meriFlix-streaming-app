import React from 'react'
import HeaderWithBack from '../../components/common/HeaderWithBack/HeaderWithBack'
import SavedMediaCollection from '../savedMedia/components/SavedMediaCollection'

const FavouriteScreen = () => {
  return (
    <HeaderWithBack headerTitle="Favourite">
      <SavedMediaCollection mode="favourite" />
    </HeaderWithBack>
  )
}

export default FavouriteScreen
