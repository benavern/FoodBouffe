import React from 'react'
import MainNavigation from '../Main'
import DetailsScreen from './detailsScreen'
import EditScreen from './editScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const sharedStack = [
  { name: 'Main', component: MainNavigation },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
]

export default function SharedStack() {
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
