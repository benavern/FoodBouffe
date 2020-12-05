import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { ingredientByIdSelector } from '../../store/ingredientsSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default function IngredientItem({ ingredient, mode = 'display', onPress }) {
  const ingredientData = useSelector(ingredientByIdSelector(ingredient.ingredientRef))

  return (
    <TouchableOpacity
      style={styles.item}
      disabled={mode !== 'edit'}
      onPress={() => onPress(ingredient.ingredientRef)}>
      { mode === 'edit' &&
        <Ionicons name="md-trash" color={colors.danger} size={text.l} style={styles.deleteIcon} />
      }

      <Text style={[globalStyle.text, styles.ingredient]}>
        <Text style={globalStyle.textBold}>{ingredientData.name}</Text> {ingredient.quantity && <Text>({ingredient.quantity})</Text>}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.overlay,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ingredient: {
    flex: 1
  },
  deleteIcon: {
    marginRight: 10
  }
})
