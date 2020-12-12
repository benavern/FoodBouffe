import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import globalStyle from '../../styles/globalStyle'
import { categoryColor, colors, text } from '../../styles/variables'
import { useSelector } from 'react-redux'
import DetailHeader from '../../components/DetailsHeader/index'
import { detailsTopRadius } from '../../config/foodbouffe.json'
import IngredientsList from '../../components/IngredientsList'
import { formatDuration, formatDate } from '../../helpers/date.helper'
import Pill from '../../components/Pill'
import PullToRefresh from '../../components/PullToRefresh'
import RecipeSteps from '../../components/RecipeSteps'
import { recipeByIdSelector } from '../../store/recipesSlice'
import { categoryByIdSelector } from '../../store/categoriesSlice'

export default function DetailsScreen ({ route }) {
  const { recipeId } = route.params
  const item = useSelector(recipeByIdSelector(recipeId))
  const category = useSelector(categoryByIdSelector(item.categoryRef))
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.detailWrapper}>
      <Animated.ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.scrollerContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true }
        )}
        refreshControl={<PullToRefresh />}>
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

            <View style={styles.detailHeaderInfo}>
              <View style={styles.detailHeaderInfoLine}>
                <Ionicons name="md-clock" color={colors.primary} size={text.l} />

                <Text style={[globalStyle.textAlt, { marginLeft: text.s }]}>
                  {formatDuration(item.prepDuration)}
                </Text>
              </View>

              { category &&
                <View style={styles.detailHeaderInfoLine}>
                  <Pill
                    style={styles.category(category)}>
                    {category.name}
                  </Pill>
                </View>
              }

              <View style={styles.detailHeaderInfoLine}>
                <Pill style={styles.creationDate}>{formatDate(item.creationDate)}</Pill>
              </View>
            </View>
          </View>

          { item.ingredients?.length &&
            <View style={globalStyle.section}>
              <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

              <IngredientsList ingredients={item.ingredients} />
            </View>
          }

          { item.steps?.length &&
            <View style={globalStyle.section}>
              <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

              <RecipeSteps steps={item.steps} />
            </View>
          }
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
    backgroundColor: colors.background
  },
  detailHeader: {
    paddingBottom: detailsTopRadius + 10
  },
  detailHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailHeaderTitle: {
    flex: 1
  },
  detailHeaderInfo: {
    marginLeft: 10
  },
  detailHeaderInfoLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  category: (category) => ({
    backgroundColor: categoryColor(category)
  }),
  creationDate: {
    backgroundColor: colors.textAlt
  },
  scroller: {
    flex: 1
  },
  scrollerContent: {
    flexGrow: 1
  },
  detailContent: {
    flex: 1,
    paddingTop: detailsTopRadius/2,
    marginTop: -detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    borderTopLeftRadius: detailsTopRadius,
    overflow: 'hidden'
  }
})
