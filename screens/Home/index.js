import React from 'react'
import HomeScreen from './homeScreen'
import DetailsScreen from '../Shared/detailsScreen'
import EditScreen from '../Shared/editScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const homeStack = [
  { name: 'Home', component: HomeScreen },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen }
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
