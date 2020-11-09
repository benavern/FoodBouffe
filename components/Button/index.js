import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default function Button({ title = 'bouton', style, buttonStyle, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, disabled && styles.wrapperDisabled, style]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[styles.button, globalStyle.textBold, buttonStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 3,
    height: 48,
  },
  wrapperDisabled: {
    backgroundColor: colors.textAlt
  },
  button: {
    textAlign: 'center',
    color: colors.buttonText,
    fontSize: text.m,
    lineHeight: 48,
    textTransform: 'uppercase'
  }
})
