import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default function Pill ({children, style, onPress, active = false, activeBorderColor = colors.primary}) {
  return (
    <TouchableWithoutFeedback
      disabled={!onPress}
      onPress={onPress}
      style={{borderWidth: 3}}>
      <View style={styles.pillActiveBorder(active, activeBorderColor)}>
        <View style={[styles.pillWrapper, style]} >
          <Text style={styles.pillText}>
            {children}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const pillSize = 24
const activeBorderWidth = 2

const styles = StyleSheet.create({
  pillActiveBorder: (active, activeColor) => ({
    padding: activeBorderWidth,
    borderWidth: activeBorderWidth,
    borderColor: active ? activeColor : 'transparent',
    borderRadius: (pillSize + activeBorderWidth * 4)
  }),
  pillText: {
    ...globalStyle.text,
    ...globalStyle.textBold,
    color: colors.buttonText,
    fontSize: text.s
  },
  pillWrapper: {
    backgroundColor: colors.primary,
    borderRadius: pillSize,
    paddingHorizontal: pillSize / 2,
    paddingVertical: (pillSize - text.s) / 2
  },
})
