import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native'
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

  const headerUserName = <Text style={{color: colors.primary}}>{user.pseudo}</Text>
  const headerTitle = <Text>Bonjour {headerUserName} !!!</Text>

  return (
    <ScrollView
      style={globalStyle.screen}
      refreshControl={<PullToRefresh />}>
      <SafeAreaView>
        <Header
          title={headerTitle}
          subtitle="Voici ce qui s'est passé récemment sur foodbouffe" />

        <BigCarousel
          style={globalStyle.carouselSection}
          title="Les toutes dernières recettes"
          subtitle="Celles qui ont été ajoutées récement"
          data={latestRecipes} />

        {
          latestByCatAppName.map(({ category, recipes }, i) => {
            const carouselTitleCatName = category.longname
            ? <Text style={styles.categoryName(category)}>{category.longname}</Text>
            : <Text style={styles.categoryName()}>recettes ???</Text>
            const carouselTitle = <Text>Les dernières { carouselTitleCatName }</Text>
            return (
              <Carousel
                key={i.toString()}
                style={globalStyle.carouselSection}
                title={carouselTitle}
                subtitle={category.description}
                data={recipes} />
            )
          })
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
