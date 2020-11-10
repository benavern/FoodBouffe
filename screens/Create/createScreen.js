import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../../styles/globalStyle'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../styles/variables'
import { createRecipe } from '../../store/recipesSlice'
import { useNavigation } from '@react-navigation/native'
import { unwrapResult } from '@reduxjs/toolkit'
const emptyRecipy = {
  name: '',
  info: '',
  categoryRef: null,
  prepDuration: 0,
  creationDate: null,
  like: false,
  image: null
}

export default function createScreen () {
  const navigation = useNavigation()
  const catList = useSelector(state => Object.keys(state.categories).map(id => ({id, ...state.categories[id]})))
  const dispatch = useDispatch()
  const [newRecipe, setnewRecipe] = useState(emptyRecipy)
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    const valid = newRecipe.name.length > 3
      && !!newRecipe.info
      && !!newRecipe.categoryRef
      && newRecipe.prepDuration > 0
      setFormValid(valid)
  }, [newRecipe])

  const infoInput = useRef(null)

  function focusNext(next) {
    if(next && next.current && next.current.focus) next.current.focus()
  }

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
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
          onSubmit={() => focusNext(infoInput)} />

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
          options={catList} />

        <Input
          label="Temps de préparation (min)"
          placeholder="10"
          keyboardType="numeric"
          maxLength={3}
          value={newRecipe.prepDuration}
          onChange={newPrepDuration => setnewRecipe(oldRec => ({
            ...oldRec,
            prepDuration: parseInt(newPrepDuration.replace(/[^0-9]/g, ''), 10) || 0
          }))} />

        <Button
          title="Créer"
          onPress={() => {
            dispatch(createRecipe({...newRecipe, creationDate: Date.now()}))
              .then(unwrapResult)
              .then((res) => {
                setnewRecipe(emptyRecipy)
                navigation.navigate('Edit', { recipeId: res.id })
              })
          }}
          disabled={!formValid} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    backgroundColor: colors.background
  }
})
