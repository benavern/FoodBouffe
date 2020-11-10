import React, { useEffect } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipeById, toggleLikeRecipe, deleteRecipe } from '../../store/recipesSlice'
import Button from '../../components/Button'
import { unwrapResult } from '@reduxjs/toolkit'
import DetailHeader from '../../components/DetailsHeader/index.js'

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={styles.scroller}>
        <DetailHeader item={item} style={styles.headerStyle} mode="edit" />

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
    </SafeAreaView>
  )
}

const roundTopHeight = 40

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    backgroundColor: colors.background
  },
  headerStyle: {
    paddingBottom: roundTopHeight
  },
  detailsWrapper: {
    flex: 1,
    paddingTop: roundTopHeight/2,
    marginTop: -roundTopHeight,
    borderTopRightRadius: roundTopHeight,
    borderTopLeftRadius: roundTopHeight
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
