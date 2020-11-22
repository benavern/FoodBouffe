import React from 'react'
import HomeScreen from './homeScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const homeStack = [
  { name: 'Home', component: HomeScreen }
]

export default function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="none">
      {homeStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
