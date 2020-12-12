import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { currentUserSelector, toggleLikeRecipe, userByIdSelector, userLikesRecipeSelector } from '../../store/userSlice'
import { useNavigation } from '@react-navigation/native'
import { colors, pageHorizontalPadding, text } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImagePicker from '../ImagePicker'
import Author from '../Author'
import { detailsImageHeight } from '../../config/foodbouffe.json'
import IconButton from '../Button/IconButton'

const defaultImage = require('../../assets/default-background.jpg')

export default function DetailHeader ({
  item,
  mode = 'display',
  style,
  imageOffset = new Animated.Value(0),
  onImageChange
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
      onImageChange(newImage.uri)
      setImage(newImage)
    } else {
      onImageChange(null)
      setImage(defaultImage)
    }
  }

  const imageTranslateY = imageOffset.interpolate({
    inputRange: [0, detailsImageHeight],
    outputRange: [0, detailsImageHeight / 2]
  })

  const imageOverlay = imageOffset.interpolate({
    inputRange: [0, detailsImageHeight],
    outputRange: [0, 0.75]
  })

  return (
    <View
      style={[styles.coverImage, style]}>
      <Animated.Image
        source={image}
        style={[styles.image, {
          transform: [{translateY: imageTranslateY}]
        }]} />

        <Animated.View
          style={[StyleSheet.absoluteFillObject, {backgroundColor: colors.background, opacity: imageOverlay }]}/>

      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerLine}>
          <IconButton
            iconName="ios-arrow-back"
            onPress={() => navigation.goBack()} />

          { mode === 'display' &&
            <IconButton
              iconName={like ? 'md-heart' : 'md-heart-empty'}
              iconColor={colors.primary}
              onPress={() => dispatch(toggleLikeRecipe(item.id))} />
          }
        </View>

        { mode === 'display' && <View style={styles.headerLine}>
          <Author user={author} />

          {author && currentUser.id === author.id &&
            <IconButton
              iconName="md-create"
              onPress={() => navigation.navigate('Edit', { recipeId: item.id })} />
          }
        </View> }

        { mode === 'edit' && <View style={styles.editImageWrapper}>
          <ImagePicker
            style={styles.editImageBtn}
            directory="recipes"
            onImage={newImage => handleNewImage(newImage)}
            onDelete={() => handleNewImage(null)}>
            <Ionicons
              name="md-create"
              color={colors.buttonText}
              size={text.xl} />
          </ImagePicker>
        </View> }
      </SafeAreaView>
    </View>
  )
}

const editImageBtnWidth = 80

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: detailsImageHeight,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: pageHorizontalPadding
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editImageWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: "center"
  },
  editImageBtn: {
    backgroundColor: colors.overlay,
    width: editImageBtnWidth,
    height: editImageBtnWidth,
    borderRadius: editImageBtnWidth,
    alignItems: "center",
    justifyContent: "center"
  }
})
