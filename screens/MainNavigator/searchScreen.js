import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RecipesList from '../../components/recipesList'
import globalStyle from '../../styles/globalStyle'
import { useSelector } from 'react-redux'
import { searchEmptyLimit } from '../../config/foodbouffe.json'
import useDebounce from '../../utils/useDebounce'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { Ionicons } from '@expo/vector-icons'
import { categoriesListSelector } from '../../store/categoriesSlice'
import { categoryColor, colors, inputHeight, text } from '../../styles/variables'
import Pill from '../../components/Pill'
import Header from '../../components/Header'

function getResults(recipes, searchTerm, searchCategory, searchAuthor) {
  if(searchTerm) {
    return recipes
      .filter(rec => !searchCategory || rec.categoryRef === searchCategory)
      .filter(rec => !searchAuthor || rec.authorRef === searchAuthor)
      .filter(rec => rec.name.match(new RegExp(searchTerm, 'i')))
  } else {
    return recipes
      .filter(rec => !searchCategory || rec.categoryRef === searchCategory)
      .filter(rec => !searchAuthor || rec.authorRef === searchAuthor)
      .slice(0, searchEmptyLimit)
  }
}

export default function HomeScreen() {
  const recipes = useSelector(state => state.recipes)
  const categories = useSelector(categoriesListSelector)
  const usersList = useSelector(state => state.user.users.map(({id, pseudo}) => ({id, name: pseudo})))
  const [searchTerm, setSearchTerm] = useState('')
  const [searchMore, setSearchMore] = useState(false)
  const [searchCategory, setSearchCategory] = useState(null)
  const [searchAuthor, setSearchAuthor] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    setSearchResults(getResults(recipes, debouncedSearchTerm, searchCategory, searchAuthor))
  }, [debouncedSearchTerm, searchCategory, searchAuthor])

  return (
    <SafeAreaView style={globalStyle.screen}>
      <Header
        title="Rechercher une recette"
        subtitle="Commencez à taper puis sélectionnez celle qui convient">
        <View style={styles.searchMain}>
          <Input
            style={styles.searchField}
            value={searchTerm}
            onChange={term => setSearchTerm(term)}
            placeholder="Pizza"
            returnKeyType="search"
            returnKeyLabel="Rechercher une recette" />

          <Button
            style={styles.searchMoreBtn}
            title={<Ionicons name={searchMore ? 'md-remove' : 'md-add'} color={colors.buttonText} size={text.l} />}
            onPress={() => setSearchMore(!searchMore)} />
        </View>

        {searchMore && <View>
            <View style={styles.categoryChoices}>
              {
                categories.map(cat => (
                  <Pill
                    key={cat.id}
                    active={searchCategory === cat.id}
                    style={{ backgroundColor: categoryColor(cat)}}
                    onPress={() => setSearchCategory(cat.id)}>
                    {cat.name}
                  </Pill>
                ))
              }
              <Pill
                style={styles.categoryChoice}
                active={!searchCategory}
                onPress={() => setSearchCategory(null)}>
                Toutes
              </Pill>
            </View>

            <Select
              value={searchAuthor}
              onChange={newAuthor => setSearchAuthor(newAuthor)}
              label="Auteur"
              nullLabel="Tous"
              options={usersList} />
          </View>
        }
      </Header>

      <View style={styles.resultsWrapper}>
        <RecipesList
          items={searchResults}
          header={
            <Text style={styles.resultsTitle}>
              {debouncedSearchTerm ? 'Résultats' : 'Suggestions'} :
            </Text>
          }
          emptyIcon="md-search"
          emptyTitle="Aucune recette ne correspond à votre recherche"
          emptySubtitle="Tentez un autre mot..." />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchMain: {
    flexDirection: 'row',
    marginTop: 20
  },
  searchField: {
    flex: 1
  },
  searchMoreBtn: {
    width: inputHeight,
    marginLeft: 10
  },
  resultsWrapper: {
    flex: 1,
    marginTop: 10
  },
  resultsTitle: {
    ...globalStyle.title,
    marginBottom: 10
  },
  categoryChoices: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  categoryChoice: {
    backgroundColor: colors.textAlt,
  }
})
