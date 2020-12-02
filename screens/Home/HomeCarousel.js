import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipesList from '../../components/recipesList'
import EmptyList from '../../components/emptyList'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'

export default function HomeCarousel({ category = {}, recipes = [] }) {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={globalStyle.title}>
          Les dernières {
            category.longname
              ? <Text style={styles.categoryName(category.color)}>{category.longname}</Text>
              : <Text style={styles.categoryName()}>recettes ???</Text>
          }
        </Text>
        {
          category.description &&
            <Text style={globalStyle.subtitle}>
              {category.description}
            </Text>
        }
      </View>

      <View style={styles.carousel}>
        {
          !recipes.length
            ? <EmptyList subtitle={'Cette catégorie n\'existe peut-être pas...'} />
            : <RecipesList horizontal items={recipes} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10
  },
  carousel: {
    marginTop: 10
  },
  categoryName: (nameColor) => ({
    color: nameColor || colors.primary
  })
})
