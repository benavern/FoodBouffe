import React from 'react'
import { StyleSheet, View } from 'react-native'
import AddIngredient from '../Button/AddIngredient'
import IngredientItem from './ingredientItem'

export default function IngredientsList ({ingredients = [], mode='display', onAdd, onRemove}) {
  return (
    <View>
      <View style={styles.list}>
        {ingredients.map((ing, i) => (
            <IngredientItem
              key={i.toString()}
              ingredient={ing}
              mode={mode}
              onPress={onRemove} />
          )
        )}
      </View>

      {mode === 'edit' && <AddIngredient onAdd={onAdd} />}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 10
  }
})
