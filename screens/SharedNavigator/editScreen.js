import React, { useEffect, useRef, useState } from 'react'
import { Alert, Animated, StyleSheet, Text, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe, recipeByIdSelector, updateRecipe } from '../../store/recipesSlice'
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
import Header from '../../components/Header'
import DurationPicker from '../../components/DurationPicker'

export default function EditScreen ({ route }) {
  const navigation = useNavigation()
  const { recipeId } = route.params
  const rowRecipe = useSelector(recipeByIdSelector(recipeId))
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

  const formValid = () => !getNameError() && !getCategoryError()

  const infoInput = useRef(null)

  function focusNext(next) {
    if(next && next.current && next.current.focus) next.current.focus()
  }

  if (!item) return (
    <View>
      <Header
        title="Rien à voir ici"
        subtitle="La recette que vous voudriez modifier n'existe pas ou a été supprimée"
        canGoBack />
    </View>
  )

  return (
    <View style={styles.detailWrapper}>
      <Animated.ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.scrollerContent}
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

            <DurationPicker
              label="Durée de préparation"
              value={item.prepDuration}
              onChange={newPrepDuration => setItem(oldItem => ({ ...oldItem, prepDuration: newPrepDuration }))} />
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

          <View style={globalStyle.bottomSection}>
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
  detailContent: {
    borderTopLeftRadius: detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    flex: 1,
    marginTop: -detailsTopRadius,
    overflow: 'hidden',
    paddingTop: detailsTopRadius/2
  },
  detailHeader: {
    paddingBottom: detailsTopRadius + 10
  },
  detailWrapper: {
    flex: 1,
  },
  scroller: {
    backgroundColor: colors.background,
    flex: 1
  },
  scrollerContent: {
    flexGrow: 1
  }
})
