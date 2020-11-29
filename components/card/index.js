import React from 'react'
import { StyleSheet, View } from "react-native"
import { colors } from '../../styles/variables'

export default function Card ({ style, children, header, headerStyle, footer, footerStyle}) {

  return (
    <View style={[styles.wrapper, style]}>
      {
        header &&
        <View style={[styles.header, headerStyle]}>
          {header}
        </View>
      }

      <View style={styles.content}>
        {children}
      </View>

      { footer &&
        <View style={[styles.footer, footerStyle]}>
          {footer}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    overflow: "hidden"
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  }
})
