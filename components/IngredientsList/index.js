import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ingredientByIdSelector } from '../../store/ingredientsSlice'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import Button from '../Button'
import AddIngredient from '../Button/AddIngredient'
import IconButton from '../Button/IconButton'

export default function IngredientsList ({ ingredients = [], onAdd, onEdit, onRemove, ...attrs }) {
  const getIngredient = useSelector(ingredientByIdSelector)

  return (
    <View {...attrs}>
      {ingredients.map((ingredient, index) => {
        const { name: ingredientName } = getIngredient(ingredient.ingredientRef)

        return (
          <View
            style={styles.ingredient}
            key={index}>
            <AddIngredient
              style={styles.ingredientContent}
              ingredient={ingredient}
              title="Modifier un ingredient"
              buttonText="modifier"
              onSubmit={editedIngredient => onEdit(index, editedIngredient)}
              disabled={!onEdit}>
              <Text style={styles.ingredientName}>{ingredientName}</Text>

              <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
            </AddIngredient>

            { onRemove &&
              <View style={styles.ingredientActions}>
                <IconButton
                  iconName="trash"
                  iconColor={colors.danger}
                  onPress={() => { onRemove(index) }} />
              </View>
            }
          </View>
        )
      })}

      {onAdd &&
        <AddIngredient
          style={styles.addBtn}
          onSubmit={onAdd}>
          <Button title="Ajouter un ingrédient" />
        </AddIngredient>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    borderBottomColor: colors.overlay,
    borderBottomWidth: 1,
    alignItems: "center"
  },
  ingredientContent: {
    flex: 1,
    flexDirection: 'row'
  },
  ingredientName: {
    ...globalStyle.text,
    ...globalStyle.textBold,
    flex: 1
  },
  ingredientQuantity: {
    ...globalStyle.text,
    textAlign: 'right',
    width: 80
  },
  ingredientActions: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  addBtn: {
    marginTop: 10
  }
})
