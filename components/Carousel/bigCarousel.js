import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Extrapolate } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { userByIdSelector } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, pageHorizontalPadding, text } from '../../styles/variables'
import Author from '../Author'

const defaultImage = require('../../assets/default-background.jpg')
const { width } = Dimensions.get('screen')
const ITEM_WIDTH = width - pageHorizontalPadding * 2
const ITEM_HEIGHT = ITEM_WIDTH * 0.625 // 16:10 ratio
const ITEM_GUTTER = 8
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
      text.xl * TITLE_MAX_LINES + 20,
      0,
      text.xl * TITLE_MAX_LINES + 20
    ],
    extrapolate: Extrapolate.CLAMP
  })

  const authorTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [-55, 0, -55],
    extrapolate: Extrapolate.CLAMP
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

export default function BigCarousel ({ data, title, subtitle, ...carouselProps }) {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View {...carouselProps}>
      {(title || subtitle) &&
        <View style={styles.carouselTitleWrapper}>
          {title && <Text style={globalStyle.title}>{title}</Text>}
          {subtitle && <Text style={globalStyle.subtitle}>{subtitle}</Text>}
        </View>
      }

      <Animated.FlatList
        contentContainerStyle={styles.carouselList}
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
    marginBottom: 20,
    paddingHorizontal: pageHorizontalPadding
  },
  carouselList: {
    paddingHorizontal: pageHorizontalPadding
  },
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
    top: '30%',
    padding: 10,
    justifyContent: 'flex-end'
  },
  itemGradient: {
    ...StyleSheet.absoluteFill,
    opacity: 0.9
  },
  itemTitle: {
    ...globalStyle.bigTitle,
    color: colors.buttonText,
    opacity: 0.77
  }
})
