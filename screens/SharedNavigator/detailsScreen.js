import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
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
import Header from '../../components/Header'


export default function DetailsScreen ({ route }) {
  const { recipeId } = route.params
  const item = useSelector(recipeByIdSelector(recipeId))
  const category = useSelector(categoryByIdSelector(item?.categoryRef))
  const scrollY = useRef(new Animated.Value(0)).current

  if (!item) return (
    <View>
      <Header
        title="Rien à voir ici"
        subtitle="La recette que vous voudriez voir n'existe pas ou a été supprimée"
        canGoBack />
    </View>
  )

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
                <Entypo name="clock" color={colors.primary} size={text.l} />

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
            <View style={item.steps?.length ? globalStyle.section : globalStyle.bottomSection}>
              <Text style={[globalStyle.title, styles.sectionTitle]}>Ingrédients</Text>

              <IngredientsList ingredients={item.ingredients} />
            </View>
          }

          { item.steps?.length &&
            <View style={globalStyle.bottomSection}>
              <Text style={[globalStyle.title, styles.sectionTitle]}>Recette</Text>

              <RecipeSteps steps={item.steps} />
            </View>
          }
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  category: (category) => ({
    backgroundColor: categoryColor(category)
  }),
  creationDate: {
    backgroundColor: colors.textAlt
  },
  detailContent: {
    borderTopLeftRadius: detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    flex: 1,
    marginTop: -detailsTopRadius,
    overflow: 'hidden',
    paddingTop: detailsTopRadius/2
  },
  detailHeader: {
    paddingBottom: detailsTopRadius + 10
  },
  detailHeaderInfo: {
    marginLeft: 10
  },
  detailHeaderInfoLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  detailHeaderSection: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  detailHeaderTitle: {
    flex: 1
  },
  detailWrapper: {
    backgroundColor: colors.background,
    flex: 1
  },
  scroller: {
    flex: 1
  },
  scrollerContent: {
    flexGrow: 1
  },
  sectionTitle: { marginBottom: 10 }
})
