import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../../styles/globalStyle'
import { homeCategoriesLimit, homeTrendingsLimit } from '../../config/foodbouffe.json'
import Carousel from '../../components/Carousel'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/userSlice'
import { categoryColor, colors } from '../../styles/variables'
import { categoryByAppNameSelector } from '../../store/categoriesSlice'
import { latestRecipesByCatAppNameSelector, latestRecipesSelector } from '../../store/recipesSlice'
import PullToRefresh from '../../components/PullToRefresh'
import BigCarousel from '../../components/Carousel/bigCarousel'
import Header from '../../components/Header'

export default function HomeScreen() {
  const user = useSelector(currentUserSelector)

  const latestByCatAppName = ['sweet', 'salted'].map(categoryAppName => ({
    category: useSelector(categoryByAppNameSelector(categoryAppName)),
    recipes: useSelector(latestRecipesByCatAppNameSelector({catAppName: categoryAppName, limit: homeCategoriesLimit}))
  }))

  const latestRecipes = useSelector(latestRecipesSelector({ limit: homeTrendingsLimit }))

  return (
    <ScrollView
      style={globalStyle.screen}
      refreshControl={<PullToRefresh />}>
      <SafeAreaView>
        <Header
          title={<Text>Bonjour <Text style={{color: colors.primary}}>{user.pseudo}</Text> !!!</Text>}
          subtitle="Voici ce qui s'est passé récemment sur foodbouffe" />

        <BigCarousel
          style={globalStyle.carouselSection}
          title="Les toutes dernières recettes"
          subtitle="Celles qui ont été ajoutées récement"
          data={latestRecipes} />

        {
          latestByCatAppName.map(({ category, recipes }, i) => (
            <Carousel
              key={i.toString()}
              style={globalStyle.carouselSection}
              title={<Text>
                Les dernières { category.longname
                  ? <Text style={styles.categoryName(category)}>{category.longname}</Text>
                  : <Text style={styles.categoryName()}>recettes ???</Text>}
              </Text>}
              subtitle={category.description}
              data={recipes} />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryName: (category) => {
    return { color: categoryColor(category) }
  }
})
