import React from 'react'
import FavoritesScreen from './favoritesScreen'
import DetailsScreen from '../Shared/detailsScreen'
import EditScreen from '../Shared/editScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const favoritesStack = [
  { name: 'Favorites', component: FavoritesScreen },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
]

export default function FavoritesStack() {
  return (
    <Stack.Navigator
      headerMode="none">
      {favoritesStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
