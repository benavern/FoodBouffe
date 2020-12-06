import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, inputHeight } from '../../styles/variables'

export default function Button({ title = 'bouton', style, buttonStyle, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[styles.buttonText, buttonStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: (inputHeight - globalStyle.title.fontSize) / 2,
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minHeight: inputHeight,
  },
  buttonDisabled: {
    backgroundColor: colors.textAlt
  },
  buttonText: {
    ...globalStyle.title,
    textAlign: 'center',
    color: colors.buttonText,
    textTransform: 'uppercase',
  }
})
