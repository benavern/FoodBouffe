import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipesList from '../../components/recipesList'
import EmptyList from '../../components/emptyList'
import { useSelector } from 'react-redux'
import { categoryByAppNameSelector } from '../../store/categoriesSlice'
import { recipesByCatAppNameSelector } from '../../store/recipesSlice'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'

export default function HomeCarousel({ categoryAppname, limit }) {
  const category = useSelector(categoryByAppNameSelector(categoryAppname)) || {}
  const recipes = useSelector(
    recipesByCatAppNameSelector(categoryAppname))
      //from most recent to older
      .sort((a,b) => b.creationDate - a.creationDate)
      // slice to homeLimit
      .slice(0, limit)
    || []

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={globalStyle.bigTitle}>
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
            ? <EmptyList subtitle={`La catégorie "${categoryAppname}" n'existe peut-être pas...`} />
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
