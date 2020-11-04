import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { db } from '../../firebase'
import { colors } from '../../styles/variables';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([])

  async function getRecipes () {
    const recipesSnapshot = await db.collection('recipes').get()
    const recipesDocs = recipesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setRecipes(recipesDocs)
  }

  useEffect(() => { getRecipes() })

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
