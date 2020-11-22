import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { changeImageRecipe } from '../../store/recipesSlice'
import { currentUserSelector, toggleLikeRecipe, userByIdSelector, userLikesRecipeSelector } from '../../store/userSlice'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePicker from '../ImagePicker'
import Author from '../Author'

const defaultImage = require('../../assets/default-background.jpg')

export default function DetailHeader ({
  item,
  mode = 'display',
  style
}) {
  const like = useSelector(userLikesRecipeSelector(item.id))
  const author = useSelector(userByIdSelector(item.authorRef))
  const currentUser = useSelector(currentUserSelector)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [image, setImage] = useState(defaultImage)

  useEffect(() => {
    if(item.image) setImage({ uri: item.image })
  }, [item.image])

  const handleNewImage = (newImage) => {
    if (newImage) {
      dispatch(changeImageRecipe({id: item.id, image: newImage.uri}))
      setImage(newImage)
    } else {
      dispatch(changeImageRecipe({id: item.id, image: null}))
      setImage(defaultImage)
    }
  }

  return (
    <ImageBackground
      source={image}
      style={[styles.coverImage, style]}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerLine}>
          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-arrow-back"
              color={colors.text}
              size={24} />
          </TouchableOpacity>

          { mode === 'display' && <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => dispatch(toggleLikeRecipe(item.id))}>
            <Ionicons
              name={like ? 'md-heart' : 'md-heart-empty'}
              color={colors.primary}
              size={24} />
          </TouchableOpacity> }
        </View>

        { mode === 'display' && <View style={styles.headerLine}>
          <Author user={author} style={styles.author}/>

          {author && currentUser.id === author.id && <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => navigation.navigate('Edit', { recipeId: item.id })}>
            <Ionicons
              name="md-create"
              color={colors.text}
              size={24} />
          </TouchableOpacity>}
        </View> }

        { mode === 'edit' && <View style={styles.editImageLine}>
          <ImagePicker
            style={styles.editImageBtn}
            directory="recipes"
            onImage={newImage => handleNewImage(newImage)}
            onDelete={() => handleNewImage(null)}>
            <Ionicons
              name="md-create"
              color={colors.buttonText}
              size={32} />
          </ImagePicker>
        </View> }
      </SafeAreaView>
    </ImageBackground>
  )
}

const coverBtnWidth = 32
const editImageBtnWidth = 80

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 300,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  author: {
    marginVertical: 10,
    marginHorizontal: 12
  },
  editImageLine: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: colors.overlay,
    width: editImageBtnWidth,
    height: editImageBtnWidth,
    borderRadius: editImageBtnWidth,
    alignItems: "center",
    justifyContent: "center"
  }
})
