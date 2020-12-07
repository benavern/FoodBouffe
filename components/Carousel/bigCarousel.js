import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Extrapolate } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { userByIdSelector } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'
import Author from '../Author'

const defaultImage = require('../../assets/default-background.jpg')
const { width } = Dimensions.get('screen')
const ITEM_WIDTH = width * 0.9 - 24 // 90% of the screen minus the screen padding
const ITEM_HEIGHT = ITEM_WIDTH * 0.56
const ITEM_GUTTER = 12
const ITEM_MAX_TRANSLATE_X = (width - ITEM_WIDTH) / 2
const TITLE_MAX_LINES = 2

function Item ({ item, index, scrollX, last }) {
  const navigation = useNavigation()
  const author = useSelector(userByIdSelector(item.authorRef))

  const img = item.image ? { uri: item.image } : defaultImage
  const inputRange = [
    (index - 1) * (ITEM_WIDTH + ITEM_GUTTER),
    index * (ITEM_WIDTH + ITEM_GUTTER),
    (index + 1) * (ITEM_WIDTH + ITEM_GUTTER)
  ]

  const imageTranslateX = scrollX.interpolate({
    inputRange,
    outputRange: [ -ITEM_MAX_TRANSLATE_X * 2, 0, ITEM_MAX_TRANSLATE_X * 2 ],
    extrapolate: Extrapolate.CLAMP
  })

  const textTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [
      text.l * TITLE_MAX_LINES + 20,
      0,
      text.l * TITLE_MAX_LINES + 20
    ],
    extrapolate: Extrapolate.CLAMP
  })

  const authorTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [-55, 0, -55]
  })

  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('Details', { recipeId: item.id }) }}>
      <View style={styles.item(last)}>
        <Animated.Image
          source={img}
          style={[styles.itemImage, {
            transform: [{ translateX: imageTranslateX }]
          }]} />

        <Animated.View
          style={[
            styles.itemAuthor,
            { transform: [{translateY: authorTranslateY}] }
          ]}>
          <Author avatarOnly user={author} />
        </Animated.View>


        <Animated.View
          style={[
            styles.itemTitleWrapper,
            { transform: [{translateY: textTranslateY}] }
          ]}>
          <LinearGradient
            colors={['transparent', '#000']}
            style={styles.itemGradient}/>

          <Text
            numberOfLines={TITLE_MAX_LINES}
            style={[styles.itemTitle, ]}>
            {item.name}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

export default function BigCarousel ({ data, title, ...carouselProps }) {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View {...carouselProps}>
      {title &&
        <View style={styles.carouselTitleWrapper}>
          <Text style={styles.carouselTitle}>{title}</Text>
        </View>
      }

      <Animated.FlatList
        style={styles.carouselList}
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces
        disableIntervalMomentum
        disableScrollViewPanResponder
        snapToInterval={ITEM_WIDTH + ITEM_GUTTER}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => (<Item item={item} index={index} scrollX={scrollX} last={data.length - 1 === index} />)} />
    </View>
  )
}

const styles = StyleSheet.create({
  carouselTitleWrapper: {
    marginBottom: 20
  },
  carouselTitle: {
    ...globalStyle.title
  },
  carouselList: {},
  item: (last) => ({
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: last ? 0 : ITEM_GUTTER,
    borderRadius: 20,
    overflow: "hidden"
  }),
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    left: -ITEM_MAX_TRANSLATE_X,
    right: -ITEM_MAX_TRANSLATE_X,
    width,
    height: ITEM_HEIGHT,
    resizeMode: "cover"
  },
  itemAuthor: {
    position: 'absolute',
    top: 15,
    right: 10
  },
  itemTitleWrapper: {
    ...StyleSheet.absoluteFillObject,
    top: '50%',
    padding: 10,
    justifyContent: 'flex-end'
  },
  itemGradient: {
    ...StyleSheet.absoluteFill,
    opacity: 0.5
  },
  itemTitle: {
    ...globalStyle.bigTitle,
    color: colors.buttonText
  }
})
