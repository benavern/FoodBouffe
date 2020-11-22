import React from 'react'
import SearchScreen from './searchScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const searchStack = [
  { name: 'Search', component: SearchScreen }
]

export default function SearchStack() {
  return (
    <Stack.Navigator
      headerMode="none">
      {searchStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
