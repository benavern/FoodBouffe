import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { toggleLikeRecipe } from '../../store/recipesSlice'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../styles/variables'
import { useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'

const defaultImage = require('../../assets/default-background.jpg')
const imageOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.6,
}

export default function DetailHeader ({
  item,
  mode = 'display',
  style
}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { showActionSheetWithOptions } = useActionSheet();
  const [image, setImage] = useState(defaultImage)

  useEffect(() => {
    if(item.image) setImage({ uri: item.image})
  }, [])

  const handleImageChange = ({cancelled, ...image}) => {
    if(cancelled) return

    setImage(image);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(imageOptions);
    handleImageChange(result)
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync(imageOptions);
    handleImageChange(result)
  };

  const promptImage = () => showActionSheetWithOptions({
    title: 'Changer d\'image',
    options: [ 'Prendre une photo', 'Choisir une image', 'Supprimer l\'image courante', 'Annuler' ],
    destructiveButtonIndex: 2,
    cancelButtonIndex: 3
  }, btnIndex => {
    if(btnIndex === 0) takePicture()
    if(btnIndex === 1) pickImage()
    if(btnIndex === 2) setImage(defaultImage)
  })

  if(!item) {
    return <Text>No Item</Text>
  }

  return (
    <ImageBackground
      source={image}
      style={[styles.coverImage, style]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLine}>
          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => navigation.popToTop()}>
            <Ionicons name="ios-arrow-back" color={colors.text} size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => dispatch(toggleLikeRecipe(item.id))}>
            <Ionicons
              name={item.like ? 'md-heart' : 'md-heart-empty'}
              color={colors.primary}
              size={24} />
          </TouchableOpacity>
        </View>

        {mode === 'display' && <View style={[styles.headerLine, styles.editItemLine]}>
          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => navigation.navigate('Edit', { recipeId: item.id })}>
            <Ionicons
              name="md-create"
              color={colors.secondary}
              size={24} />
          </TouchableOpacity>
        </View>}

        {mode === 'edit' && <View style={styles.editImageLine}>
          <TouchableOpacity
            style={styles.editImageBtn}
            onPress={promptImage}>
            <Ionicons
              name="md-create"
              color={colors.primary}
              size={32} />
          </TouchableOpacity>
        </View>}
      </View>
    </ImageBackground>
  )
}

const coverBtnWidth = 32
const editImageBtnWidth = 80

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 220
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editItemLine: {
    justifyContent: 'flex-end'
  },
  editImageLine: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6
  },
  coverBtn: {
    backgroundColor: colors.background,
    width: coverBtnWidth,
    height: coverBtnWidth,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 12
  },
  editImageBtn: {
    marginTop: -editImageBtnWidth / 2,
    backgroundColor: colors.background,
    width: editImageBtnWidth,
    height: editImageBtnWidth,
    borderRadius: editImageBtnWidth,
    alignItems: "center",
    justifyContent: "center"
  }
})
