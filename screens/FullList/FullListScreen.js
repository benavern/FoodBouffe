import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipesList from '../../components/recipesList';
import globalStyle from '../../styles/globalStyle';
import { useSelector } from 'react-redux';
import { recipesAlphabeticSelector } from '../../store/recipesSlice';

export default function FullList () {
  const recipes = useSelector(recipesAlphabeticSelector)

  const pageHeader = () => (
    <SafeAreaView style={styles.pageHeader}>
      <Text style={globalStyle.bigTitle}>
        Toutes les recettes
      </Text>
      <Text style={globalStyle.subtitle}>
        En manque d'inspiration ? essayez la recherche!
      </Text>
    </SafeAreaView>
  )

  return (
    <View style={styles.pageContainer}>
      <RecipesList
        items={recipes}
        header={pageHeader} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    ...globalStyle.screen,
    paddingTop: 0,
    flex: 1
  },
  pageHeader: {
    ...globalStyle.section,
    paddingTop: globalStyle.section.paddingTop + globalStyle.screen.paddingTop,
  },
  pageEmpty: {
    flex: 1
  }
})
