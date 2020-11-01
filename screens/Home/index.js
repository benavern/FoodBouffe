import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import recepes from './recepes.json';

export default function HomeScreen() {
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

      <RecipesList items={recepes} />
    </SafeAreaView>
  );
}
