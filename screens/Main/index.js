import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../store/userSlice'
import { fetchCategories } from '../../store/categoriesSlice'
import { fetchIngredients } from '../../store/ingredientsSlice'
import { colors } from '../../styles/variables'

import HomeScreen from '../Home'
import FavoritesScreen from '../Favorites'
import SearchScreen from '../Search'
import CreateScreen from '../Create'
import SettingsScreen from '../Settings'

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', icon: 'md-home', component: HomeScreen },
  { name: 'Favorites', icon: 'md-heart-empty', component: FavoritesScreen },
  { name: 'Search', icon: 'md-search', component: SearchScreen },
  { name: 'Create', icon: 'md-add', component: CreateScreen },
  { name: 'Settings', icon: 'md-settings', component: SettingsScreen}
]

export default function() {
  const dispatch = useDispatch()
  useEffect(() => {
    // here we fetch whatever won't be often refreshed on the app lifecycle
    dispatch(fetchUsers()) // users
    dispatch(fetchCategories()) // categories
    dispatch(fetchIngredients()) // ingredients
  }, [])

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
