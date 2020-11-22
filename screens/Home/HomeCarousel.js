import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecipesList from '../../components/recipesList'
import EmptyList from '../../components/emptyList'
import { useSelector } from 'react-redux'
import { categoryByAppNameSelector } from '../../store/categoriesSlice'
import { recipesByCatAppNameSelector } from '../../store/recipesSlice'
import globalStyle from '../../styles/globalStyle'

export default function HomeCarousel({ categoryAppname, limit }) {
  const category = useSelector(categoryByAppNameSelector(categoryAppname)) || {}
  const recipes = useSelector(recipesByCatAppNameSelector(categoryAppname)).slice(0, limit) || []

  if(!recipes.length) return <EmptyList subtitle={`La catégorie "${categoryAppname}" n'existe peut-être pas...`} />

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Les dernières <Text style={{ color: category.color}}>{category.longname}</Text>
        </Text>
        <Text style={globalStyle.subtitle}>
          {category.description}
        </Text>
      </View>

      <View style={styles.carousel}>
        <RecipesList horizontal items={recipes} />
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
  }
})
