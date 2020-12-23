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
  addBtn: {
    marginTop: 10
  },
  ingredient: {
    alignItems: "center",
    borderBottomColor: colors.overlay,
    borderBottomWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  ingredientActions: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 48
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
  }
})
