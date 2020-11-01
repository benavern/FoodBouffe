import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { colors } from '../../styles/variables'

export default function Card ({ style, children, footer, coverImage }) {
  return (
    <View style={[style, styles.wrapper]}>
      { coverImage &&
        <View style={styles.header}>
          <Image
            source={{ uri: coverImage }}
            style={styles.coverImage}
            />
        </View>
      }

      <View style={styles.content}>
        {children}
      </View>

      { footer &&
        <View style={styles.footer}>
          {footer}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    overflow: "hidden"
  },
  content: {
    padding: 15,
  },
  coverImage: {
    width: '100%',
    height: 100
  },
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 10
  }
})
