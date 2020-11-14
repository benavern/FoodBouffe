import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { storage } from '../../firebase'
import { TouchableOpacity } from 'react-native'

export default function RecipeImagePicker({
  children,
  style,
  directory = 'uploads',
  aspect = [4, 3],
  width = 600,
  onImage = () => {},
  onDelete = () => {},
}) {
  const { showActionSheetWithOptions } = useActionSheet();

  const imagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect,
    quality: 1
  }

  const imageManipulatorOptions = [
    [{ resize: { width } }],
    { format: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  ]

  const handleImageChange = async ({cancelled, ...image}) => {
    if(cancelled) return

    // optimize image
    const result = await ImageManipulator.manipulateAsync(image.uri, ...imageManipulatorOptions)

    // get image blob
    const imageFile = await fetch(result.uri)
    const imageBlob = await imageFile.blob()

    // upload to firebase storage
    const imageRef = storage.ref(`${directory}/${Date.now()}.jpg`)
    const uploadTask = await imageRef.put(imageBlob, {contentType: 'image/jpeg'})
    const uploadedImageUri = await uploadTask.ref.getDownloadURL()

    // broadcast the new image
    onImage({...result, uri: uploadedImageUri});
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
    handleImageChange(result)
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync(imagePickerOptions);
    handleImageChange(result)
  };

  const promptImage = () => showActionSheetWithOptions({
    title: 'Que voulez-vous faire?',
    options: [ 'Prendre une photo', 'Choisir une image', 'Supprimer l\'image courante', 'Annuler' ],
    destructiveButtonIndex: 2,
    cancelButtonIndex: 3
  }, btnIndex => {
    if(btnIndex === 0) takePicture()
    if(btnIndex === 1) pickImage()
    if(btnIndex === 2) onDelete()
  })

  return (
    <TouchableOpacity
      style={style}
      onPress={promptImage}>
      {children}
    </TouchableOpacity>
  )
}
