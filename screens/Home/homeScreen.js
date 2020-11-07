import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../store/recipesSlice';
import { homeLimit } from '../../config/foodbouffe.json'
import EmptyList from '../../components/emptyList';

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes.slice(0, homeLimit))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Mes dernières recettes
        </Text>
        <Text style={globalStyle.subtitle}>
          Les plus récentes
        </Text>
      </View>

      {
        recipes.length
          ? <RecipesList items={recipes} />
          : <EmptyList />
      }
    </SafeAreaView>
  );
}
