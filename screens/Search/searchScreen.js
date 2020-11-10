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

function setResults(recipes, searchTerm, setFn) {
  if(searchTerm) {
    setFn(recipes.filter(rec => {
      return rec.name.match(new RegExp(searchTerm, 'i'))
    }))
  } else {
    setFn(recipes.slice(0, searchEmptyLimit))
  }
}

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const [searchTerm, onSearchTermChange] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  useEffect(() => {
    setResults(recipes, debouncedSearchTerm, setSearchResults)
  }, [debouncedSearchTerm])

  useEffect(() => {
    setResults(recipes, debouncedSearchTerm, setSearchResults)
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

      <View style={styles.searchInput}>
        <Input
          value={searchTerm}
          onChange={term => onSearchTermChange(term)}
          placeholder="Pizza"
          returnKeyType="search"
          returnKeyLabel="Rechercher une recette" />
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
  searchInput: {
    marginVertical: 10
  },
  resultsWrapper: {
    flex: 1
  }
})
