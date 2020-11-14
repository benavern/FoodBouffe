import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { fetchCategories } from './store/categoriesSlice'
import { colors } from './styles/variables'

// import HomeScreen from './screens/Home'
import FavoritesScreen from './screens/Favorites'
import SearchScreen from './screens/Search'
import CreateScreen from './screens/Create'
import SettingsScreen from './screens/Settings'
import { fetchUsers } from './store/userSlice'

const Tab = createBottomTabNavigator();

const screens = [
  // { name: 'Home', icon: 'md-home', component: HomeScreen },
  { name: 'Search', icon: 'md-search', component: SearchScreen },
  { name: 'Favorites', icon: 'md-heart-empty', component: FavoritesScreen },
  { name: 'Create', icon: 'md-add', component: CreateScreen },
  { name: 'Settings', icon: 'md-settings', component: SettingsScreen}
]

export default function() {
  const dispatch = useDispatch()
  useEffect(() => {
    // here we fetch whatever won't be often refreshed on the app lifecycle
    dispatch(fetchUsers()) // users
    dispatch(fetchCategories()) // categories
  }, [])

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  )
}
