import React, { useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipeById, deleteRecipe, updateRecipe } from '../../store/recipesSlice'
import Button from '../../components/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import DetailHeader from '../../components/DetailsHeader/index'
import { detailsTopRadius } from '../../config/foodbouffe.json'
import AddIngredient from '../../components/Button/AddIngredient'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { categoriesListSelector } from '../../store/categoriesSlice'
import IngredientsList from '../../components/IngredientsList'
import { useNavigation } from '@react-navigation/native'

export default function EditScreen ({ route }) {
  const navigation = useNavigation()
  const { recipeId } = route.params
  const catList = useSelector(categoriesListSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState({})

  useEffect(() => {
    setLoading(true)
    dispatch(fetchRecipeById(recipeId))
      .then(unwrapResult)
      .then(recipe => {
        setLoading(false)
        setItem(recipe)
      })
  }, [recipeId])

  function confirmDeleteAlert () {
    return Alert.alert(
      'Supprimer la recette',
      `Vous êtes sur le point de supprimer la recette "${item.name}". Voulez vous continuer ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => { console.log('Deletion cancelled') }
        },
        {
          text: 'Supprimer',
          onPress: () => {
            dispatch(deleteRecipe(recipeId))
              .then(unwrapResult)
              .then(() => {
                console.log('Suppression effectuée', recipeId)
                navigation.popToTop()
              })
          }
        },
      ]
    )
  }

  async function submitForm () {
    const res = await dispatch(updateRecipe(item)).then(unwrapResult)
    navigation.goBack()
  }

  const infoInput = useRef(null)

  function focusNext(next) {
    if(next && next.current && next.current.focus) next.current.focus()
  }

  if (loading) return <Text>Loading...</Text>

  return (
    <View style={styles.detailWrapper}>
      <ScrollView style={styles.scroller}>
        <DetailHeader
          item={item}
          style={styles.detailHeader} mode="edit" />

        <View style={[globalStyle.screen, styles.detailContent]}>
          <View style={globalStyle.section}>
            <Input
              label="Nom de la recette"
              placeholder="Pizza maison"
              returnKeyType="next"
              value={item.name}
              onChange={name => setItem(oldItem => ({...oldItem, name}))}
              onSubmit={() => focusNext(infoInput)} />

            <Input
              ref={infoInput}
              label="Description rapide"
              placeholder="À la mozzarella"
              value={item.info}
              onChange={info => setItem(oldItem => ({...oldItem, info}))} />

            <Select
              label="Sélectionner une catégorie"
              value={item.categoryRef}
              onChange={newCatRef => setItem(oldItem => ({ ...oldItem, categoryRef: newCatRef }))}
              options={catList} />

            <Input
              label="Temps de préparation (min)"
              placeholder="10"
              keyboardType="numeric"
              maxLength={3}
              value={item.prepDuration}
              onChange={newPrepDuration => setItem(oldItem => ({
                ...oldItem,
                prepDuration: parseInt(newPrepDuration.replace(/[^0-9]/g, ''), 10) || 0
              }))} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

            <IngredientsList
              ingredients={item.ingredients}
              mode="edit"
              onAdd={newIngredient => setItem(oldItem => ({...oldItem, ingredients: [...(oldItem.ingredients || []), newIngredient]}))}
              onRemove={ingredientToRemove => setItem(oldItem => ({ ...oldItem, ingredients: (oldItem.ingredients || []).filter(ing => ing.ingredientRef !== ingredientToRemove) }))} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

            <View>
              <Input
                multiline
                label="Contenu de la recette"
                placeholder="Tout mettre dans la casserole et cuire 10 min"
                value={item.details}
                onChange={details => setItem(oldItem => ({...oldItem, details}))} />
            </View>
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Actions</Text>

            <Button
              style={{ backgroundColor: colors.success }}
              title="Valider"
              onPress={() => submitForm()} />
            <Button
              style={{backgroundColor: colors.danger}}
              title="Supprimer"
              onPress={() => confirmDeleteAlert()} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
  },
  detailHeader: {
    paddingBottom: detailsTopRadius + 10
  },
  scroller: {
    flex: 1,
    backgroundColor: colors.background
  },
  detailContent: {
    flex: 1,
    paddingTop: detailsTopRadius/2,
    marginTop: -detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    borderTopLeftRadius: detailsTopRadius,
    overflow: 'hidden'
  }
})
