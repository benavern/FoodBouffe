import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../styles/variables'

import HomeScreen from '../Home/homeScreen'
import FullList from '../FullList/FullListScreen'
import SearchScreen from '../Search/searchScreen'
import CreateScreen from '../Create/createScreen'
import SettingsScreen from '../Settings/userSettingsScreen'

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', icon: 'md-home', component: HomeScreen },
  { name: 'All Recipes', icon: 'md-apps', component: FullList },
  { name: 'Search', icon: 'md-search', component: SearchScreen },
  { name: 'Create', icon: 'md-add', component: CreateScreen },
  { name: 'Settings', icon: 'md-person', component: SettingsScreen}
]

export default function() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        showLabel: false,
        style: {
          borderTopColor: colors.textAlt,
          backgroundColor: colors.background,
        },
        tabStyle: {
          backgroundColor: colors.cardBackground
        }
      }}>
        {screens.map((screen, index) => (
          <Tab.Screen
            key={index.toString()}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarIcon: ({color, size}) => (
                <Ionicons name={screen.icon} size={size} color={color} />
              )
            }} />
        ))}
    </Tab.Navigator>
  )
}
