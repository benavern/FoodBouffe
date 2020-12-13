import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/variables'

export default function ({ onPress, iconName = 'md-hand', iconColor = colors.text, backgroundColor = colors.background, size = 32 }) {
  return (
    <TouchableOpacity
      style={styles.iconButton(size, backgroundColor)}
      onPress={onPress}
      disabled={!onPress}>
      <Ionicons
        name={iconName}
        color={iconColor}
        size={Math.floor(size * 2/3)} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  iconButton: (size, backgroundColor) => ({
    backgroundColor,
    width: size,
    height: size,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  })
})
