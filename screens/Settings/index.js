import React from 'react'
import UserSettingsScreen from './userSettingsScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const settingsStack = [
  { name: 'User Settings', component: UserSettingsScreen },
]

export default function SettingsStack() {
  return (
    <Stack.Navigator
      headerMode="none">
      {settingsStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
