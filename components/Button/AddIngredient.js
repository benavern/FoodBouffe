import React, { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import Button from '.'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import Input from '../Input'
import Select from '../Select'

const emptyIngredient = {
  name: '',
  unitRef: null,
  id: null
}

const ingredients = [
  {
    name: 'Tomates',
    unitRef: 'u1',
    id: 'i1'
  },
  {
    name: 'Lait',
    unitRef: 'u2',
    id: 'i2'
  }
]

const units = [
  {
    name: 'Unités',
    id: 'u1'
  },
  {
    name: 'L',
    id: 'u2'
  },
  {
    name: 'cL',
    id: 'u3'
  },
  {
    name: 'mL',
    id: 'u4'
  },
  {
    name: 'm',
    id: 'u5'
  },
  {
    name: 'dm',
    id: 'u6'
  },
  {
    name: 'cm',
    id: 'u7'
  },
  {
    name: 'mm',
    id: 'u8'
  },
]

export default function AddIngredient({ onAdd }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [ingredient, setIngredient] = useState(emptyIngredient)
  const [quantity, setQuantity] = useState(0)

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={[globalStyle.bigTitle, globalStyle.section]}>Hello World!</Text>

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

            <View style={styles.quantityLine}>
              <Input
                style={{ flex: 1, marginRight: 10 }}
                label="Quantité"
                placeholder="12"
                keyboardType="numeric"
                value={quantity}
                onChange={newQuantity => setQuantity(parseInt(newQuantity.replace(/[^0-9]/g, ''), 10) || 0)} />

              <Select
                style={{ width: 130 }}
                label="Unité"
                nullLabel="Aucune"
                value={ingredient.unitRef}
                onChange={newUnitRef => setIngredient(ing => ({...ing, unitRef: newUnitRef}))}
                options={units}
                disabled={!!ingredient.id} />
            </View>

            <Button
              title="Valider"
              onPress={() => {
                onAdd && onAdd({ ...ingredient, quantity })
                setIngredient(emptyIngredient)
                setQuantity(0)
                setModalVisible(false);
              }}/>
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
  },
  quantityLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  }
})
