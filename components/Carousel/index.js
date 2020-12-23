import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipesList from '../recipesList'
import EmptyList from '../emptyList'
import globalStyle from '../../styles/globalStyle'
import { pageHorizontalPadding } from '../../styles/variables'

export default function Carousel({ data, title, subtitle, ...carouselProps }) {
  return (
    <View {...carouselProps}>
      { (title || subtitle) &&
        <View style={styles.carouselTitleWrapper}>
          {title && <Text style={globalStyle.title}>{title}</Text>}
          {subtitle && <Text style={globalStyle.subtitle}>{subtitle}</Text>}
        </View>
      }

      <View style={styles.carousel}>
        {
          !data.length
            ? <EmptyList subtitle={'Cette catégorie n\'existe peut-être pas...'} />
            : <RecipesList horizontal items={data} style={{ marginVertical: 0 }} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  carousel: {},
  carouselTitleWrapper: {
    marginBottom: 20,
    paddingHorizontal: pageHorizontalPadding
  }
})
