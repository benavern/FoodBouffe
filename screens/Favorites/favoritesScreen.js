import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, recipesCountSelector } from '../../store/recipesSlice';
import EmptyList from '../../components/emptyList';
import { favoriteRecipesSelector } from '../../store/recipesSlice';

export default function FavoritesScreen () {
  const recipes = useSelector(favoriteRecipesSelector)
  const recipesCount = useSelector(recipesCountSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  const favoritesCountText = <Text style={globalStyle.textBold}>{recipes.length}</Text>
  const recipesCountText = <Text style={globalStyle.textBold}>{recipesCount}</Text>

  function pluralize(word, nb = 1) {
    if(nb > 1) return word + 's'
    return word
  }

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Mes recettes favorites
        </Text>
        <Text style={globalStyle.subtitle}>
          Vous avez {favoritesCountText} {pluralize('recette', recipes.length)} en favori sur {recipesCountText} en tout
        </Text>
      </View>

      {
        recipes.length
          ? <RecipesList items={recipes} />
          : <EmptyList
              icon="md-heart-dislike"
              title="Aucune recette favorite."
              subtitle="Pensez à en ajouter pour les retrouver plus facilement!" />
      }
    </SafeAreaView>
  );
}
