import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipesList from '../../components/recipesList'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import { useSelector } from 'react-redux'
import { recipesAlphabeticSelector } from '../../store/recipesSlice'

export default function FullList () {
  const recipes = useSelector(recipesAlphabeticSelector)

  return (
    <View style={globalStyle.screen}>
      <RecipesList
        style={styles.pageContainer}
        contentContainerStyle={styles.pageContent}
        items={recipes}
        header={
          <SafeAreaView>
            <Header
              style={styles.header}
              title="Toutes les recettes"
              subtitle="En manque d'inspiration ? essayez la recherche!" />
          </SafeAreaView>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  pageContent: {
    ...globalStyle.screen
  },
  header: {
    paddingTop: 0,
    paddingHorizontal: 0
  }
})
