import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { ScrollView } from 'react-native'
import { colors } from '../../styles/variables'
import { createRecipe } from '../../store/recipesSlice'
import { useNavigation } from '@react-navigation/native'
import { unwrapResult } from '@reduxjs/toolkit'
import { categoriesListSelector } from '../../store/categoriesSlice'
const emptyRecipy = {
  name: '',
  info: '',
  categoryRef: null,
  prepDuration: 0,
  image: null
}

export default function createScreen () {
  const navigation = useNavigation()
  const catList = useSelector(categoriesListSelector)
  const dispatch = useDispatch()
  const [newRecipe, setnewRecipe] = useState(emptyRecipy)

  const infoInput = useRef(null)

  function focusNext(next) {
    if(next && next.current && next.current.focus) next.current.focus()
  }

  const getNameError = () => {
    if (!newRecipe.name) return 'Vous devez donner un nom à la recette'
    if (newRecipe.name.length < 3) return 'Le nom de la recette doit faire plus de 3 caractères'
    return null
  }

  const getCategoryError = () => {
    if (!newRecipe.categoryRef) return 'Vous devez choisir une catégorie'
    return null
  }

  const getPrepDurationError = () => {
    if (!newRecipe.prepDuration) return 'Un temps de préparation inférieur à 1 min? Je ne vous crois pas !'
    return null
  }

  const formValid = () => !getNameError() && !getCategoryError() && !getPrepDurationError()

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View style={globalStyle.section}>
        <Text style={globalStyle.bigTitle}>
          Créer une recette
        </Text>
        <Text style={globalStyle.subtitle}>
          Miam, on s'en lèche les babines!
        </Text>
      </View>

      <ScrollView style={styles.scroller}>
        <Input
          label="Nom de la recette"
          placeholder="Pizza maison"
          value={newRecipe.name}
          returnKeyType="next"
          onChange={newName => setnewRecipe(oldRec => ({ ...oldRec, name: newName }))}
          onSubmit={() => focusNext(infoInput)}
          error={getNameError()} />

        <Input
          ref={infoInput}
          label="Description rapide"
          placeholder="À la mozzarella"
          value={newRecipe.info}
          onChange={newInfo => setnewRecipe(oldRec => ({ ...oldRec, info: newInfo }))} />

        <Select
          label="Sélectionner une catégorie"
          value={newRecipe.categoryRef}
          onChange={newCatRef => setnewRecipe(oldRec => ({ ...oldRec, categoryRef: newCatRef }))}
          options={catList}
          error={getCategoryError()} />

        <Input
          label="Temps de préparation (min)"
          placeholder="10"
          keyboardType="numeric"
          maxLength={3}
          value={newRecipe.prepDuration}
          onChange={newPrepDuration => setnewRecipe(oldRec => ({
            ...oldRec,
            prepDuration: parseInt(newPrepDuration.replace(/[^0-9]/g, ''), 10) || 0
          }))}
          error={getPrepDurationError()} />

        <Button
          title="Créer"
          style={{ backgroundColor: colors.success }}
          onPress={() => {
            dispatch(createRecipe(newRecipe))
              .then(unwrapResult)
              .then((res) => {
                setnewRecipe(emptyRecipy)
                navigation.navigate('Edit', { recipeId: res.id })
              })
          }}
          disabled={!formValid()} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroller: {
    ...globalStyle.bottomSection,
    flex: 1,
    backgroundColor: colors.background
  }
})
