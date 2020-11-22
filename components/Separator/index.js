import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../styles/variables'

export default function Separator ({ vertical, color=colors.overlay }) {
  return <View style={[
    styles.separator,
    vertical
      ? styles.vertical
      : styles.horizontal,
    { backgroundColor: color }
  ]} />
}

const separatorWidth = 4

const styles = StyleSheet.create({
  separator: {
    borderRadius: separatorWidth / 2
  },
  horizontal: {
    height: separatorWidth,
    width: '80%',
    marginHorizontal: '10%',
    marginVertical: 20
  },
  vertical: {
    width: separatorWidth,
    height: '80%',
    marginVertical: '10%',
    marginHorizontal: 20
  }
})
