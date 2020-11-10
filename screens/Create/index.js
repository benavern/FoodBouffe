import React from 'react'
import CreateScreen from './createScreen'
import DetailsScreen from '../Shared/detailsScreen'
import EditScreen from '../Shared/editScreen'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

const createStack = [
  { name: 'Create', component: CreateScreen },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
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
