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
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  footer: {
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  wrapper: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    flex: 1,
    overflow: "hidden"
  }
})
