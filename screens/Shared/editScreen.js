import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipeById, deleteRecipe } from '../../store/recipesSlice'
import Button from '../../components/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import DetailHeader from '../../components/DetailsHeader/index'

export default function EditScreen ({ navigation, route }) {
  const { recipeId } = route.params
  const item = useSelector(state => state.recipes.find(rec => rec.id === recipeId) || {})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId))
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

  function confirmDeleteAlert () {
    return Alert.alert(
      'Supprimer la recette',
      `Vous êtes sur le point de supprimer la recette "${item.name}". Voulez vous continuer ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => { console.log('Deletion cancelled') }
        },
        {
          text: 'Supprimer',
          onPress: () => {
            dispatch(deleteRecipe(recipeId))
              .then(unwrapResult)
              .then(() => {
                console.log('Suppression effectuée', recipeId)
                navigation.popToTop()
              })
          }
        },
      ]
    )
  }

  return (
    <View style={styles.detailWrapper}>
      <DetailHeader item={item} style={styles.detailHeader} mode="edit" />

      <View style={styles.detailMain}>
        <ScrollView style={styles.scroller}>

          <View style={[globalStyle.screen, styles.detailsWrapper]}>
            <View style={[{ flexDirection: 'row', justifyContent: "space-between" }, styles.section]}>
              <View>
                <Text style={globalStyle.bigTitle}>[EDIT] {item.name}</Text>

                <Text style={globalStyle.subtitle}>{item.info}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="md-clock" color={colors.secondary} size={24} />

                <Text style={[{ marginLeft: 6 }, globalStyle.textAlt]}>{_formatDuration(item.prepDuration)}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

              <View>
                <Text style={globalStyle.textAlt}>. truc</Text>
                <Text style={globalStyle.textAlt}>. machin</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

              <View>
                <Text style={globalStyle.textAlt}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quidem vitae quod fugit doloribus vel iure unde impedit, at facilis obcaecati eveniet nulla adipisci ad. Distinctio ullam quas totam provident.
                </Text>
              </View>

            </View>

            <View style={styles.section}>
              <Text style={[globalStyle.title, { marginBottom: 10 }]}>Zone de danger</Text>

              <Button
                style={styles.deleteButton}
                title="Supprimer"
                onPress={() => confirmDeleteAlert()} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const roundTopHeight = 40

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
  },
  detailHeader: {
    paddingBottom: roundTopHeight
  },
  detailMain: {
    flex: 1,
    marginTop: -roundTopHeight,
    borderTopRightRadius: roundTopHeight,
    borderTopLeftRadius: roundTopHeight,
    overflow: 'hidden'
  },
  scroller: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContent: {
    flex: 1,
    paddingTop: roundTopHeight/2
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBackground
  },
  deleteButton: {
    backgroundColor: colors.secondary
  }
})
