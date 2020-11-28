import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipesList from '../../components/recipesList'
import globalStyle from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../../store/recipesSlice'
import { searchEmptyLimit } from '../../config/foodbouffe.json'
import useDebounce from '../../utils/useDebounce'
import EmptyList from '../../components/emptyList'
import Input from '../../components/Input'
import { categoriesListSelector } from '../../store/categoriesSlice'
import { colors } from '../../styles/variables'

function getResults(recipes, searchTerm, searchCategory, setFn) {
  if(searchTerm) {
    return recipes
    .filter(rec => !searchCategory || rec.categoryRef === searchCategory)
    .filter(rec => rec.name.match(new RegExp(searchTerm, 'i')))
  } else {
    return recipes
      .filter(rec => !searchCategory || rec.categoryRef === searchCategory)
      .slice(0, searchEmptyLimit)
  }
}

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes)
  const categories = useSelector(categoriesListSelector)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  useEffect(() => {
    setSearchResults(getResults(recipes, debouncedSearchTerm, searchCategory))
  }, [debouncedSearchTerm, searchCategory])

  useEffect(() => {
    setSearchResults(getResults(recipes, debouncedSearchTerm, searchCategory))
  }, [recipes])

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Rechercher une recettes
        </Text>
        <Text style={globalStyle.subtitle}>
          Commencez à taper puis sélectionnez celle qui convient
        </Text>
      </View>

      <View style={globalStyle.section}>
        <Input
          value={searchTerm}
          onChange={term => setSearchTerm(term)}
          placeholder="Pizza"
          returnKeyType="search"
          returnKeyLabel="Rechercher une recette" />

        <View style={styles.categoryChoices}>
          {
            categories.map(cat => (
              <Text
                key={cat.id}
                style={[globalStyle.chips, { backgroundColor: cat.color}, searchCategory === cat.id && styles.categoryChoiceSelected]}
                onPress={() => setSearchCategory(cat.id)}>
                {cat.name}
              </Text>
            ))
          }
          <Text
            style={[globalStyle.chips, styles.categoryChoice]}
            onPress={() => setSearchCategory(null)}>
            Toutes
          </Text>
        </View>
      </View>

      <View style={styles.resultsWrapper}>
        <Text style={globalStyle.title}>
          {debouncedSearchTerm ? 'Resultats' : 'Suggestions'} :
        </Text>

        {
          searchResults.length
            ? <RecipesList items={searchResults} />
            : <EmptyList
                icon="md-search"
                title="Aucune recette ne correspond à votre recherche"
                subtitle="Tentez un autre mot..." />
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultsWrapper: {
    flex: 1,
    marginTop: 10
  },
  categoryChoices: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  categoryChoice: {
    backgroundColor: colors.textAlt,
  },
  categoryChoiceSelected: {
    borderColor: colors.primary,
    borderWidth: 2
  }
})
