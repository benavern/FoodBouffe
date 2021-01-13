import React from 'react'
import { StyleSheet, View } from 'react-native'
import RecipesList from '../../components/recipesList'
import globalStyle from '../../styles/globalStyle'
import { useSelector } from 'react-redux'
import { recipesFavoritesAlphabeticSelector } from '../../store/recipesSlice'
import { currentUserSelector, userByIdSelector } from '../../store/userSlice'
import { useRoute } from '@react-navigation/native'
import Header from '../../components/Header'

export default function FavoritesList () {
  const { params = {} } = useRoute()
  const { userId } = params
  const user = useSelector(userId ? userByIdSelector(userId) : currentUserSelector)
  const recipes = useSelector(recipesFavoritesAlphabeticSelector(user.id))

  return (
    <View style={globalStyle.screen}>
      <RecipesList
        style={styles.pageContainer}
        contentContainerStyle={styles.pageContent}
        items={recipes}
        header={
          <Header
            style={styles.header}
            title={`Favoris de ${user.pseudo}`}
            subtitle={`${user.pseudo} a aimé manger ces recettes`}
            canGoBack />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    paddingTop: 0
  },
  pageContent: {
    ...globalStyle.screen
  }
})
