import React, { useEffect } from 'react'
import MainNavigation from '../Main'
import DetailsScreen from './detailsScreen'
import EditScreen from './editScreen'

import { createStackNavigator } from '@react-navigation/stack'

import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../store/userSlice'
import { fetchCategories } from '../../store/categoriesSlice'
import { fetchIngredients } from '../../store/ingredientsSlice'

const Stack = createStackNavigator()

const sharedStack = [
  { name: 'Main', component: MainNavigation },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
]

export default function SharedStack() {
  const dispatch = useDispatch()
  useEffect(() => {
    // here we fetch whatever won't be often refreshed on the app lifecycle
    dispatch(fetchUsers()) // users
    dispatch(fetchCategories()) // categories
    dispatch(fetchIngredients()) // ingredients
  }, [])

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
