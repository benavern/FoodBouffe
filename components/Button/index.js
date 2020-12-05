import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, inputHeight, text } from '../../styles/variables'

export default function Button({ title = 'bouton', style, buttonStyle, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, style, disabled && styles.wrapperDisabled]}
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
    borderRadius: 10,
    height: inputHeight,
  },
  wrapperDisabled: {
    backgroundColor: colors.textAlt
  },
  button: {
    textAlign: 'center',
    color: colors.buttonText,
    fontSize: text.m,
    lineHeight: inputHeight,
    textTransform: 'uppercase'
  }
})
