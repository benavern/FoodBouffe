import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useSelector } from 'react-redux'
import DetailHeader from '../../components/DetailsHeader/index'
import { detailsTopRadius } from '../../config/foodbouffe.json'
import IngredientsList from '../../components/IngredientsList'
import { formatDuration } from '../../helpers/date.helper'

export default function DetailsScreen ({ route }) {
  const { recipeId } = route.params
  const item = useSelector(state => state.recipes.find(rec => rec.id === recipeId) || {})
  const category = useSelector(state => state.categories[item.categoryRef])
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.detailWrapper}>
      <Animated.ScrollView
        style={styles.scroller}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true }
        )}>
        <DetailHeader
          item={item}
          style={styles.detailHeader}
          imageOffset={scrollY}
          />

        <View style={[globalStyle.screen, styles.detailContent]}>
          <View style={[globalStyle.section, styles.detailHeaderSection]}>
            <View style={styles.detailHeaderTitle}>
              <Text style={globalStyle.bigTitle}>{item.name}</Text>

              <Text style={globalStyle.subtitle}>{item.info}</Text>
            </View>

            <View>
              <View style={styles.detailHeaderInfo}>
                <Ionicons name="md-clock" color={colors.secondary} size={24} />

                <Text style={[{ marginLeft: 6 }, globalStyle.textAlt]}>
                  {formatDuration(item.prepDuration)}
                </Text>
              </View>

              { category &&
                <Text
                  style={[
                    globalStyle.chips,
                    styles.category(category.color)
                  ]}>
                  {category.name}
                </Text>
              }
            </View>
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

            <IngredientsList ingredients={item.ingredients} />
          </View>

          <View style={globalStyle.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

            <View>
              <Text style={globalStyle.textAlt}>
                {item.details}
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
  },
  detailHeader: {
    paddingBottom: detailsTopRadius + 10
  },
  detailHeaderTitle: {
    flex: 1,
    marginRight: 10
  },
  detailHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scroller: {
    flex: 1,
    backgroundColor: colors.background
  },
  detailContent: {
    flex: 1,
    paddingTop: detailsTopRadius/2,
    marginTop: -detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    borderTopLeftRadius: detailsTopRadius,
    overflow: 'hidden'
  },
  detailHeaderSection: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  category: (bg) => ({
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: bg || colors.primary
  })
})
