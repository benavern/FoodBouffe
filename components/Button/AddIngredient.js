import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import Button from '.'
import { createIngredient, ingredientsListSelector } from '../../store/ingredientsSlice'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import Input from '../Input'
import Select from '../Select'
import IconButton from './IconButton'

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

  function closeModal() {
    setIngredient(emptyIngredient)
    setQuantity('')
    setModalVisible(false);
  }

  async function handleNewIngredient () {
    let ingredientToAdd = ingredient
    // create the ingredient if it doens not already exist
    if (!ingredient.id) {
      ingredientToAdd = await dispatch(createIngredient({name: ingredient.name})).then(unwrapResult)
    }

    // notify that a new ingredient has been added
    onAdd && onAdd({ ingredientRef: ingredientToAdd.id, quantity })

    // reset the form and close modal
    closeModal()
  }

  const getNameError = () => {
    if (!ingredient.name) return 'Vous devez donner un nom au nouvel ingredient'
    if (!ingredient.id && ingredients.some(ing => ing.name.toLowerCase() === ingredient.name.toLowerCase())) {
      return 'Cet ingrédient existe déjà'
    }
    return null
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { closeModal() }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCloseBtn}>
            <IconButton
              iconName="md-close"
              onPress={() => { closeModal() }} />
          </View>

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
              onChange={newName => setIngredient(ing => ({...ing, name: newName}))}
              error={getNameError()} /> }

            <Input
              label="Quantité"
              placeholder="1 tablette"
              value={quantity}
              onChange={newQuantity => setQuantity(newQuantity)} />

            <Button
              title="Ajouter"
              disabled={getNameError()}
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
    paddingHorizontal: 12,
    paddingTop: 52,
    paddingBottom: 10,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 10,
    right: 12
  },
  modalView: {
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  }
})
