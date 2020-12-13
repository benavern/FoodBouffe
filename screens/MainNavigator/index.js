import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/variables'
import TabBar from './TabBar'

import HomeScreen from './homeScreen'
import FullList from './FullListScreen'
import SearchScreen from './searchScreen'
import CreateScreen from './createScreen'

const Tab = createBottomTabNavigator();

const makeIcon = iconName => ({ color, size }) => (<Ionicons name={iconName} size={size} color={color} />)

const screens = [
  { name: 'Home', component: HomeScreen, options: { tabBarIcon: makeIcon('md-home')} },
  { name: 'All Recipes', component: FullList, options: { tabBarIcon: makeIcon('md-apps')} },
  { name: 'Search', component: SearchScreen, options: { tabBarIcon: makeIcon('md-search')} },
  { name: 'Create', component: CreateScreen, options: { tabBarIcon: makeIcon('md-add')} }
]

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        showLabel: false,
        style: {
          backgroundColor: colors.background,
        },
        tabStyle: {
          backgroundColor: colors.cardBackground
        }
      }}
      tabBar={TabBar}>
        {screens.map((screen, index) => (
          <Tab.Screen
            key={index.toString()}
            {...screen}
            onTabPress />
        ))}
    </Tab.Navigator>
  )
}
