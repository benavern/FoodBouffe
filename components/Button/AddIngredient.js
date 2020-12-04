import { unwrapResult } from '@reduxjs/toolkit'
import uniqId from 'lodash/uniqueId'
import React, { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '.'
import { createIngredient, ingredientsListSelector } from '../../store/ingredientsSlice'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import Input from '../Input'
import Select from '../Select'

const emptyIngredient = {
  name: '',
  id: null
}

export default function AddIngredient({ onAdd }) {
  const dispatch = useDispatch()
  const ingredients = useSelector(ingredientsListSelector)
  const [modalVisible, setModalVisible] = useState(false)
  const [ingredient, setIngredient] = useState(emptyIngredient)
  const [quantity, setQuantity] = useState('')

  async function handleNewIngredient () {
    let ingredientToAdd = ingredient
    // create the ingredient if it doens not already exist
    if (!ingredient.id) {
      ingredientToAdd = await dispatch(createIngredient({name: ingredient.name})).then(unwrapResult)
    }

    // notify that a new ingredient has been added
    onAdd && onAdd({ ingredientRef: ingredientToAdd.id, quantity, id: uniqId() })

    // reset the form and close modal
    setIngredient(emptyIngredient)
    setQuantity('')
    setModalVisible(false);
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={[globalStyle.bigTitle, globalStyle.section]}>Ajouter un ingrédient</Text>

            <Select
              nullLabel="Nouvel ingrédient"
              value={ingredient.id}
              onChange={val => setIngredient(ingredients.find(ing => ing.id === val) || emptyIngredient)}
              options={ingredients} />

            {!ingredient.id && <Input
              label="Nom de l'ingrédient"
              placeholder="Chocolat"
              value={ingredient.name}
              onChange={newName => setIngredient(ing => ({...ing, name: newName}))} /> }

            <Input
              label="Quantité"
              placeholder="1 tablette"
              value={quantity}
              onChange={newQuantity => setQuantity(newQuantity)} />

            <Button
              title="Ajouter"
              onPress={() => handleNewIngredient()}/>
          </View>
        </View>
      </Modal>

      <Button
        onPress={() => setModalVisible(true) }
        title="Ajouter un ingrédient" />
    </View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: colors.background,
    margin: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  }
})
