import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { COLORS } from '../../../theme/colors'

interface AuthTextInputProps extends TextInputProps {
  label: string
}

const AuthTextInput: React.FC<AuthTextInputProps> = ({ label, ...props }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="#9A91BF"
        style={[styles.input, props.style]}
      />
    </View>
  )
}

export default AuthTextInput

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
  },
  label: {
    color: '#D4CCF6',
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(171, 139, 255, 0.25)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: COLORS.white,
    paddingHorizontal: 14,
    fontSize: 14,
  },
})
