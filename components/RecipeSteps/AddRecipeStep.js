import React, { Children, cloneElement, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from '../Modal'
import Button from '../Button'
import globalStyle from '../../styles/globalStyle'
import Input from '../Input'

export default function AddRecipeStep({
  onSubmit,
  step = '',
  title = 'Ajouter une étape',
  buttonText = 'Ajouter',
  disabled,
  children,
  ...attrs
}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [stepValue, setStepValue] = useState('')

  function closeModal() {
    setStepValue('')
    setModalVisible(false);
  }

  async function handleNewStepValue () {
    // notify that a new step has been added
    onSubmit && onSubmit(stepValue)

    // reset the form and close modal
    closeModal()
  }

  const getFormError = () => {
    if (!stepValue) return 'Décrivez cette étape en quelques mots'
    if (stepValue.length < 10) return 'La description d\'une étape doit faire au moins 10 caractères'
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

        <Input
            multiline
            style={styles.input}
            label="Description de l'étape"
            placeholder="Tout mettre dans la casserole et cuire 10 min"
            value={stepValue}
            onChange={newStepValueValue => setStepValue(newStepValueValue)}
            error={getFormError()} />

        <Button
          title={buttonText}
          disabled={getFormError()}
          onPress={() => handleNewStepValue()}/>
      </Modal>

      { Children.map(
        children,
        child => cloneElement(child, {
          onPress: () => {
            if(disabled) return
            setStepValue(step)
            setModalVisible(true)
          }
        }))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: { maxHeight: 300 }
})
