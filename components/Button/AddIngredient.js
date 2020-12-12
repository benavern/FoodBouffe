import React, { Children, cloneElement, useState } from 'react'
import { Text, View } from 'react-native'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import Button from '.'
import { alphabeticalIngredientsListSelector, createIngredient } from '../../store/ingredientsSlice'
import globalStyle from '../../styles/globalStyle'
import Input from '../Input'
import Select from '../Select'

const emptyIngredient = {
  name: '',
  id: null
}

export default function AddIngredient({
  onSubmit,
  ingredient = null,
  title = 'Ajouter un ingrédient',
  buttonText = "Ajouter",
  disabled,
  children,
  ...attrs
}) {
  const dispatch = useDispatch()
  const ingredients = useSelector(alphabeticalIngredientsListSelector)

  const [modalVisible, setModalVisible] = useState(false)
  const [ingredientValue, setIngredientValue] = useState(emptyIngredient)
  const [quantityValue, setQuantityValue] = useState('')

  function closeModal() {
    setIngredientValue(emptyIngredient)
    setQuantityValue('')
    setModalVisible(false);
  }

  async function handleNewIngredient () {
    let ingredientToAdd = ingredientValue
    // create the ingredient if it doens not already exist
    if (!ingredientValue.id) {
      ingredientToAdd = await dispatch(createIngredient({name: ingredientValue.name})).then(unwrapResult)
    }
    // notify that a new ingredient has been added
    onSubmit && onSubmit({ ingredientRef: ingredientToAdd.id, quantity: quantityValue })

    // reset the form and close modal
    closeModal()
  }

  const getNameError = () => {
    if (!ingredientValue.name) return 'Vous devez donner un nom au nouvel ingredient'
    if (!ingredientValue.id && ingredients.some(ing => ing.name.toLowerCase() === ingredientValue.name.toLowerCase())) {
      return 'Cet ingrédient existe déjà'
    }
    return null
  }

  return (
    <View {...attrs}>
      <Modal
        visible={modalVisible}
        close={() => { closeModal() }}>
        <Text style={[globalStyle.bigTitle, globalStyle.section]}>
          {title}
        </Text>

        <Select
          nullLabel="Nouvel ingrédient"
          value={ingredientValue.id}
          onChange={val => setIngredientValue(ingredients.find(ing => ing.id === val) || emptyIngredient)}
          options={ingredients} />

        {!ingredientValue.id && <Input
          label="Nom de l'ingrédient"
          placeholder="Chocolat"
          value={ingredientValue.name}
          onChange={newName => setIngredientValue(ing => ({...ing, name: newName}))}
          error={getNameError()} /> }

        <Input
          label="Quantité"
          placeholder="1 tablette"
          value={quantityValue}
          onChange={newQuantityValue => setQuantityValue(newQuantityValue)} />

        <Button
          title={buttonText}
          disabled={getNameError()}
          onPress={() => handleNewIngredient()}/>
      </Modal>


      { Children.map(
        children,
        child => cloneElement(child, {
          onPress: () => {
            if(disabled) return

            if(ingredient?.ingredientRef) {
              setIngredientValue({ id: ingredient.ingredientRef, name: 'dummy ingredient name' })
              setQuantityValue(ingredient.quantity)
            } else {
              setIngredientValue(emptyIngredient)
              setQuantityValue('')
            }

            setModalVisible(true)
          }
        }))
      }
    </View>
  )
}
