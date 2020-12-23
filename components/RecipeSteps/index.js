import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import Button from '../Button'
import IconButton from '../Button/IconButton'
import AddRecipeStep from './AddRecipeStep'

export default function RecipeSteps ({ steps = [], onAdd, onEdit, onRemove, ...attrs }) {
  return (
    <View {...attrs}>
      {steps.map((step, index) => (
        <View
          style={styles.step}
          key={index}>
          <Text style={styles.stepIndex}>{index + 1}</Text>

          <AddRecipeStep
            style={styles.stepContent}
            step={step}
            title="Modifier une étape"
            buttonText="Modifier"
            onSubmit={editedStep => onEdit(index, editedStep)}
            disabled={!onEdit}>
            <Text style={styles.stepText}>{step}</Text>
          </AddRecipeStep>

          {onRemove &&
            <View style={styles.stepActions}>
              <IconButton
                iconName="trash"
                iconColor={colors.danger}
                onPress={() => { onRemove(index) }} />
            </View>
          }
        </View>
      ))}

      {onAdd &&
        <AddRecipeStep
          style={styles.addBtn}
          onSubmit={onAdd}>
          <Button title="Ajouter une étape" />
        </AddRecipeStep>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  addBtn: {
    marginTop: 10
  },
  step: {
    flexDirection: "row",
    marginTop: 15
  },
  stepActions: {
    alignItems: "flex-end",
    justifyContent: 'center',
    width: 48
  },
  stepContent: {
    flex: 1
  },
  stepIndex: {
    ...globalStyle.title,
    color: colors.primary,
    width: 32
  },
  stepText: {
    ...globalStyle.text
  }
})
