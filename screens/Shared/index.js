import React, { useState } from 'react'
import MainNavigation from '../Main'
import DetailsScreen from './detailsScreen'
import EditScreen from './editScreen'

import { createStackNavigator } from '@react-navigation/stack'

import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../store/userSlice'
import { fetchCategories } from '../../store/categoriesSlice'
import { fetchIngredients } from '../../store/ingredientsSlice'
import { AppLoading } from 'expo'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchRecipes } from '../../store/recipesSlice'

const Stack = createStackNavigator()

const sharedStack = [
  { name: 'Main', component: MainNavigation },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
]

export default function SharedStack() {
  const dispatch = useDispatch()
  const [dataReady, setDataReady] = useState(false)

  const fetchData = () => {
    // here we fetch whatever won't be often refreshed on the app lifecycle
    return Promise.all([
      dispatch(fetchUsers()).then(unwrapResult), // users
      dispatch(fetchCategories()).then(unwrapResult), // categories
      dispatch(fetchIngredients()).then(unwrapResult), // ingredients
      dispatch(fetchRecipes()).then(unwrapResult), // recipes
    ])
  }

  if(!dataReady) {
    return <AppLoading
      startAsync={fetchData}
      onFinish={() => setDataReady(true)} />
  }

  return (
    <Stack.Navigator
      headerMode="none">
      {sharedStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
