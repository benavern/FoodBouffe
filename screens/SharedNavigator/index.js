import React, { useState } from 'react'
import MainNavigation from '../MainNavigator'
import DetailsScreen from './detailsScreen'
import EditScreen from './editScreen'
import UserScreen from './userScreen'
import FavoritesScreen from './FavoritesScreen'

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'

import { refreshAppData } from '../../components/PullToRefresh'
import LoadingScreen from '../../components/LoadingScreen'

const Stack = createStackNavigator()

const sharedStack = [
  { name: 'Main', component: MainNavigation },
  { name: 'Details', component: DetailsScreen },
  { name: 'Edit', component: EditScreen },
  { name: 'User', component: UserScreen },
  { name: 'Favorites', component: FavoritesScreen }
]

export default function SharedStack() {
  const [dataReady, setDataReady] = useState(false)

  if(!dataReady) {
    return <LoadingScreen
      startAsync={refreshAppData}
      onFinish={() => setDataReady(true)} />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
      }}
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
