import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { colors } from '../../styles/variables'

export default function Card ({ style, children, header, footer, coverImage, defaultCoverImage }) {

  return (
    <View style={[styles.wrapper, style]}>
      { (coverImage || defaultCoverImage) &&
        <Image
          source={coverImage ? { uri: coverImage } : defaultCoverImage}
          style={styles.coverImage}
          />
      }

      {
        header &&
        <View style={styles.header}>
          {header}
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
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    overflow: "hidden"
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1
  },
  coverImage: {
    width: '100%',
    height: 100
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10
  },
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 10
  }
})
