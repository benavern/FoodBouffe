import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes)

  const emptyList = (
    <View style={globalStyle.fullCenter}>
      <Ionicons name="md-sad" size={64} color={colors.textAlt} />

      <Text style={[globalStyle.title, { color: colors.secondary }]}>
        Aucune recette ici.
      </Text>

      <Text></Text>
    </View>
  )

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Mes dernières recettes
        </Text>
        <Text style={globalStyle.subtitle}>
          Filtrer mes recettes pour mieux les retrouver
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
