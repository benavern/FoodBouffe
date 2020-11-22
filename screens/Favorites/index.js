import React from 'react'
import FavoritesScreen from './favoritesScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const favoritesStack = [
  { name: 'Favorites', component: FavoritesScreen }
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
