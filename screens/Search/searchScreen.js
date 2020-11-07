import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipesList from '../../components/recipesList'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../../store/recipesSlice'
import { searchEmptyLimit } from '../../config/foodbouffe.json'
import useDebounce from '../../utils/useDebounce'
import EmptyList from '../../components/emptyList'

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const [inputUsed, setInputUsed] = useState(false)
  const [searchTerm, onSearchTermChange] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(fetchRecipes()).then(() => {
      setSearchResults(recipes.slice(0, searchEmptyLimit))
    })
  }, [])

  useEffect(() => {
    if(debouncedSearchTerm) {
      setSearchResults(recipes.filter(rec => {
        return rec.name.match(new RegExp(debouncedSearchTerm, 'i'))
      }))
    } else {
      setSearchResults(recipes.slice(0, searchEmptyLimit))
    }
  }, [debouncedSearchTerm])

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
        <TextInput
          style={[globalStyle.textInput, inputUsed && globalStyle.textInputFocus]}
          value={searchTerm}
          onChangeText={term => onSearchTermChange(term)}
          placeholder="Pizza"
          placeholderTextColor={colors.textAlt}
          returnKeyType="search"
          returnKeyLabel="Rechercher une recette"
          onFocus={() => setInputUsed(true)}
          onBlur={() => setInputUsed(!!searchTerm)} />
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
    marginTop: 20
  },
  resultsWrapper: {
    flex: 1
  }
})