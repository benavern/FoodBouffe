import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../store/recipesSlice';


export default function FavoritesScreen () {
  const recipes = useSelector(state => state.recipes.filter(rec => rec.like))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  const emptyList = (
    <View style={globalStyle.fullCenter}>
      <Ionicons name="md-sad" size={64} color={colors.textAlt} />

      <Text style={[globalStyle.title, { color: colors.secondary }]}>
        Aucune recette favorite.
      </Text>

      <Text>Pensez à en ajouter ;)</Text>
    </View>
  )

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
          : emptyList
      }
    </SafeAreaView>
  );
}
