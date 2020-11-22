import React from 'react'
import CreateScreen from './createScreen'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

const createStack = [
  { name: 'Create', component: CreateScreen }
]

export default function CreateStack() {
  return (
    <Stack.Navigator
      headerMode="none">
      {createStack.map((screen, index) => (
        <Stack.Screen
          key={index.toString()}
          name={screen.name}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  )
}
