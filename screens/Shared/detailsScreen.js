import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipeById } from '../../store/recipesSlice'
import { fetchUserById } from '../../store/userSlice'
import DetailHeader from '../../components/DetailsHeader/index'
import { detailsTopRadius } from '../../config/foodbouffe.json'
import { unwrapResult } from '@reduxjs/toolkit'
import IngredientsList from '../../components/IngredientsList'

export default function DetailsScreen ({ route }) {
  const { recipeId } = route.params
  const item = useSelector(state => state.recipes.find(rec => rec.id === recipeId) || {})
  const category = useSelector(state => state.categories[item.categoryRef])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId))
      .then(unwrapResult)
      .then((res) => {
        // refresh user data, just in case...
        if(res.authorRes) dispatch(fetchUserById(res.authorRef))
      })
  }, [])

  function _formatDuration(duration) {
    if (typeof duration !== 'number') {
      return 'NA'
    }
    if (duration > 60) {
      const hrs = Math.floor(duration / 60);
      const mins = duration - hrs * 60
      return mins
        ? `${hrs} Heures ${mins} Mins`
        : `${hrs} Heures`
    }
    return `${duration} Mins`
  }

  return (
    <View style={styles.detailWrapper}>
      <DetailHeader item={item} style={styles.detailHeader} />

      <View style={styles.detailMain}>
        <ScrollView style={styles.scroller}>
          <View style={[globalStyle.screen, styles.detailContent]}>
            <View style={[{ flexDirection: 'row', justifyContent: "space-between" }, globalStyle.section]}>
              <View>
                <Text style={globalStyle.bigTitle}>{item.name}</Text>

                <Text style={globalStyle.subtitle}>{item.info}</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="md-clock" color={colors.secondary} size={24} />

                  <Text style={[{ marginLeft: 6 }, globalStyle.textAlt]}>{_formatDuration(item.prepDuration)}</Text>
                </View>

                { category && <Text style={[globalStyle.chips, styles.category, {backgroundColor: category.color}]}>
                  {category.name}
                </Text> }
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
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
  },
  detailHeader: {
    paddingBottom: detailsTopRadius
  },
  detailMain: {
    flex: 1,
    marginTop: -detailsTopRadius,
    borderTopRightRadius: detailsTopRadius,
    borderTopLeftRadius: detailsTopRadius,
    overflow: 'hidden'
  },
  scroller: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContent: {
    flex: 1,
    paddingTop: detailsTopRadius/2
  },
  category: {
    alignSelf: 'flex-end',
    marginTop: 10
  }
})
