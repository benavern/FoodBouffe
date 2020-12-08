import React, { useEffect, useRef, useState } from 'react'
import { Alert, Animated, StyleSheet, Text, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe, recipeById, updateRecipe } from '../../store/recipesSlice'
import Button from '../../components/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import DetailHeader from '../../components/DetailsHeader/index'
import { detailsTopRadius } from '../../config/foodbouffe.json'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { categoriesListSelector } from '../../store/categoriesSlice'
import IngredientsList from '../../components/IngredientsList'
import RecipeSteps from '../../components/RecipeSteps'
import { useNavigation } from '@react-navigation/native'
import cloneDeep from 'lodash/cloneDeep'

export default function EditScreen ({ route }) {
  const navigation = useNavigation()
  const { recipeId } = route.params
  const rowRecipe = useSelector(recipeById(recipeId))
  const catList = useSelector(categoriesListSelector)
  const dispatch = useDispatch()
  const [item, setItem] = useState({})
  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setItem(cloneDeep(rowRecipe))
  }, [rowRecipe])

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
    await dispatch(updateRecipe(item)).then(unwrapResult)
    navigation.goBack()
  }

  const getNameError = () => {
    if (!item.name) return 'Vous devez donner un nom à la recette'
    if (item.name.length < 3) return 'Le nom de la recette doit faire plus de 3 caractères'
    return null
  }

  const getCategoryError = () => {
    if (!item.categoryRef) return 'Vous devez choisir une catégorie'
    return null
  }

  const getPrepDurationError = () => {
    if (!item.prepDuration) return 'Un temps de préparation inférieur à 1 min? Je ne vous crois pas !'
    return null
  }

  const formValid = () => !getNameError() && !getCategoryError() && !getPrepDurationError()

  const infoInput = useRef(null)

  function focusNext(next) {
    if(next && next.current && next.current.focus) next.current.focus()
  }
  return (
    <View style={styles.detailWrapper}>
      <Animated.ScrollView
        style={styles.scroller}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true }
        )}>
        <DetailHeader
          item={item}
          style={styles.detailHeader} mode="edit"
          imageOffset={scrollY}
          onImageChange={image => setItem(oldItem => ({...oldItem, image}))} />

        <View style={[globalStyle.screen, styles.detailContent]}>
          <View style={globalStyle.section}>
            <Input
              label="Nom de la recette"
              placeholder="Pizza maison"
              returnKeyType="next"
              value={item.name}
              onChange={name => setItem(oldItem => ({...oldItem, name}))}
              onSubmit={() => focusNext(infoInput)}
              error={getNameError()} />

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
              options={catList}
              error={getCategoryError()} />

            <Input
              label="Temps de préparation (min)"
              placeholder="10"
              keyboardType="numeric"
              maxLength={3}
              value={item.prepDuration}
              onChange={newPrepDuration => setItem(oldItem => ({
                ...oldItem,
                prepDuration: parseInt(newPrepDuration.replace(/[^0-9]/g, ''), 10) || 0
              }))}
              error={getPrepDurationError()} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

            <IngredientsList
              ingredients={item.ingredients}
              onAdd={newIngredient => setItem(oldItem => ({...oldItem, ingredients: [...(oldItem.ingredients || []), newIngredient]}))}
              onEdit={(index, editedIngredient) => setItem(oldItem => {
                const ingredients = oldItem.ingredients
                ingredients[index] = editedIngredient
                return {...oldItem, ingredients}
              })}
              onRemove={ingredientIndex => setItem(oldItem => ({ ...oldItem, ingredients: (oldItem.ingredients || []).filter((ingredient, index) => index !== ingredientIndex) }))} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

            <RecipeSteps
              steps={item.steps}
              onAdd={newStep => setItem(oldItem => ({...oldItem, steps: [...(oldItem.steps || []), newStep]}))}
              onEdit={(index, editedStep) => setItem(oldItem => {
                const steps = oldItem.steps
                steps[index] = editedStep
                return {...oldItem, steps}
              })}
              onRemove={stepIndex => setItem(oldItem => ({...oldItem, steps: (oldItem.steps || []).filter((_, i) => i !== stepIndex)}))} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Actions</Text>

            <Button
              style={{ backgroundColor: colors.success }}
              title="Enregistrer"
              disabled={!formValid()}
              onPress={() => submitForm()} />

            <Button
              style={{backgroundColor: colors.danger}}
              title="Supprimer"
              onPress={() => confirmDeleteAlert()} />
          </View>
        </View>
      </Animated.ScrollView>
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
