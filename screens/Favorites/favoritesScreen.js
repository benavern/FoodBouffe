import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../store/recipesSlice';
import EmptyList from '../../components/emptyList';


export default function FavoritesScreen () {
  const recipes = useSelector(state => state.recipes.filter(rec => rec.like))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Mes recettes favorites
        </Text>
        <Text style={globalStyle.subtitle}>
          Celles que je fais souvent
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
