import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../styles/variables'

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
    borderRadius: (pillSize + activeBorderWidth * 4) / 2
  }),
  pillWrapper: {
    height: pillSize,
    backgroundColor: colors.secondary,
    paddingHorizontal: pillSize / 2,
    borderRadius: pillSize / 2
  },
  pillText: {
    color: '#fff',
    fontSize: pillSize / 2,
    lineHeight: pillSize,
    fontFamily: 'Raleway-bold',
  },
})
