import React from 'react';
import { StyleSheet, Text } from 'react-native';
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
    <RecipesList
      style={styles.pageContainer}
      contentContainerStyle={styles.pageContent}
      items={recipes}
      header={pageHeader} />
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  pageContent: {
    ...globalStyle.screen
  },
  pageHeader: {
    ...globalStyle.section,
    marginBottom: 20
  },
  pageEmpty: {
    flex: 1
  }
})
