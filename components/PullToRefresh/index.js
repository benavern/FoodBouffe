import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../styles/variables'
import store from '../../store'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchCategories } from '../../store/categoriesSlice'
import { fetchUsers } from '../../store/userSlice'
import { fetchIngredients } from '../../store/ingredientsSlice'
import { fetchRecipes } from '../../store/recipesSlice'

export const refreshAppData = () => {
  return Promise.all([
    store.dispatch(fetchUsers()).then(unwrapResult), // users
    store.dispatch(fetchCategories()).then(unwrapResult), // categories
    store.dispatch(fetchIngredients()).then(unwrapResult), // ingredients
    store.dispatch(fetchRecipes()).then(unwrapResult), // recipes
  ])
}

export default function PullToRefresh({
  title = "Chargement des recettes...",
  onSuccess = () => {},
  onError = () => {},
  offset = true,
  style,
  children,
  controlParams
}) {
  const [refreshing, setRefreshing] = useState(false)
  const { top: refreshControlTopOffset } = useSafeAreaInsets()

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refreshAppData()
      onSuccess()
    } catch (error) {
      onError()
    }
    setRefreshing(false)
  })

  return <RefreshControl
    style={style}
    {...controlParams}
    refreshing={refreshing}
    onRefresh={onRefresh}
    colors={[colors.primary]}
    tintColor={colors.primary}
    progressBackgroundColor={colors.background}
    title={title}
    titleColor={colors.text}
    progressViewOffset={offset ? refreshControlTopOffset : null}>
    {children}
  </RefreshControl>
}
