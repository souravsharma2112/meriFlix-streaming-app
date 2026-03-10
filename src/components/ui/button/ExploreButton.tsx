import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface ExploreButtonProps {
  title?: string;
  category?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle
}

const ExploreButton: React.FC<ExploreButtonProps> = ({
  title = 'Explore All',
  category,
  onPress,
  containerStyle,
  textStyle,
}) => {

    const navigation = useNavigation<any>()

  const handlePress = () => {
    if (onPress) {
      onPress()
      return
    }

    if (category) {
      navigation.navigate('listingScreen', { category })
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        containerStyle,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="#AB8BFF" />
      </View>
    </Pressable>
  )
}

export default ExploreButton

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  pressed: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#AB8BFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
})
