import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../../theme/colors'

interface AuthActionButtonProps {
  label: string
  icon?: string
  backgroundColor: string
  textColor?: string
  borderColor?: string
  onPress?: () => void
}

const AuthActionButton: React.FC<AuthActionButtonProps> = ({
  label,
  icon,
  backgroundColor,
  textColor = COLORS.white,
  borderColor,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor: borderColor ?? backgroundColor },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>
        {icon ? <Ionicons name={icon as any} size={18} color={textColor} /> : null}
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={styles.iconWrap} />
    </Pressable>
  )
}

export default AuthActionButton

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.995 }],
  },
  iconWrap: {
    width: 22,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
})
