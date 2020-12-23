import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
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
import Header from '../../components/Header'
import DurationPicker from '../../components/DurationPicker'

const emptyRecipy = {
  name: '',
  info: '',
  categoryRef: null,
  prepDuration: 1,
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

  const formValid = () => !getNameError() && !getCategoryError()

  return (
    <SafeAreaView style={globalStyle.screen}>
      <Header
        title="Créer une recette"
        subtitle="Miam, on s'en lèche les babines!" />

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

        <DurationPicker
          label="Durée de préparation"
          value={newRecipe.prepDuration}
          onChange={newPrepDuration => setnewRecipe(oldRec => ({ ...oldRec, prepDuration: newPrepDuration }))} />

        <Button
          title="Créer"
          style={{ backgroundColor: colors.success }}
          onPress={() => {
            dispatch(createRecipe(newRecipe))
              .then(unwrapResult)
              .then((res) => {
                setnewRecipe(emptyRecipy)
                navigation.jumpTo('Home')
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
    backgroundColor: colors.background,
    flex: 1
  }
})
