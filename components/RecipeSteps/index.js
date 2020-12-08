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
                iconName="md-trash"
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
  step: {
    flexDirection: "row",
    marginTop: 15
  },
  stepIndex: {
    ...globalStyle.title,
    width: 32,
    color: colors.primary
  },
  stepContent: {
    flex: 1
  },
  stepText: {
    ...globalStyle.text
  },
  stepActions: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: 'center'
  },
  addBtn: {
    marginTop: 10
  }
})
