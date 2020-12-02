import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../styles/globalStyle';
import { homeLimit } from '../../config/foodbouffe.json'
import HomeCarousel from './HomeCarousel';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/userSlice';
import { colors } from '../../styles/variables';
import { categoryByAppNameSelector } from '../../store/categoriesSlice';
import { recipesByCatAppNameSelector } from '../../store/recipesSlice';

export default function HomeScreen() {
  const user = useSelector(currentUserSelector)
  const sweetCategory = useSelector(categoryByAppNameSelector('sweet'))
  const saltedCategory = useSelector(categoryByAppNameSelector('salted'))
  const sweetRecipes = useSelector(recipesByCatAppNameSelector('sweet'))
    .sort((a,b) => b.creationDate - a.creationDate) //from most recent to older
    .slice(0, homeLimit) // slice to homeLimit
  const saltedRecipes = useSelector(recipesByCatAppNameSelector('salted'))
    .sort((a,b) => b.creationDate - a.creationDate) //from most recent to older
    .slice(0, homeLimit) // slice to homeLimit

  return (
    <ScrollView style={globalStyle.screen}>
      <SafeAreaView>
        <View style={globalStyle.section}>
          <Text style={globalStyle.bigTitle}>
            Bonjour <Text style={{color: colors.primary}}>{user.pseudo}</Text>
          </Text>

          <Text style={globalStyle.subtitle}>Voici ce qui s'est passé récemment sur foodbouffe</Text>
        </View>

        <HomeCarousel category={sweetCategory} recipes={sweetRecipes} />
        <HomeCarousel category={saltedCategory} recipes={saltedRecipes} />
      </SafeAreaView>
    </ScrollView>
  );
}
