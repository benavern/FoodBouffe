import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { currentUserSelector, toggleLikeRecipe, userByIdSelector, userLikesRecipeSelector } from '../../store/userSlice'
import { useNavigation } from '@react-navigation/native'
import { colors, pageHorizontalPadding, text } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
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

      <View style={styles.headerContainer}>
        <View style={styles.headerLine}>
          <IconButton
            iconName="chevron-left"
            onPress={() => navigation.goBack()} />

          { mode === 'display' &&
            <IconButton
              iconName={like ? 'heart' : 'heart-outlined'}
              iconColor={colors.primary}
              onPress={() => dispatch(toggleLikeRecipe(item.id))} />
          }
        </View>

        { mode === 'display' && <View style={styles.headerLine}>
          <Author user={author} canGoToProfile/>

          {author && currentUser.id === author.id &&
            <IconButton
              iconName="edit"
              onPress={() => navigation.navigate('Edit', { recipeId: item.id })} />
          }
        </View> }

        { mode === 'edit' && <View style={styles.editImageWrapper}>
          <ImagePicker
            style={styles.editImageBtn}
            directory="recipes"
            onImage={newImage => handleNewImage(newImage)}
            onDelete={() => handleNewImage(null)}>
            <Entypo
              name="brush"
              color={colors.buttonText}
              size={text.xl} />
          </ImagePicker>
        </View> }
      </View>
    </View>
  )
}

const editImageBtnWidth = 80

const styles = StyleSheet.create({
  coverImage: {
    height: detailsImageHeight,
    width: '100%',
  },
  editImageBtn: {
    alignItems: "center",
    backgroundColor: colors.overlay,
    borderRadius: editImageBtnWidth,
    height: editImageBtnWidth,
    justifyContent: "center",
    width: editImageBtnWidth
  },
  editImageWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: 'center'
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: pageHorizontalPadding,
    paddingVertical: 10
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  }
})
