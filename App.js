import 'react-native-gesture-handler'
import './firebaseTimeoutError.fix'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { colors } from './styles/variables'
import { Provider } from 'react-redux'
import store from './store'
import * as Font from 'expo-font'
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Lobster_400Regular } from '@expo-google-fonts/lobster'

import HomeScreen from './screens/Home'
import FavoritesScreen from './screens/Favorites'
import SearchScreen from './screens/Search'
import CreateScreen from './screens/Create'
import { AppLoading } from 'expo'

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', icon: 'md-home', component: HomeScreen },
  { name: 'Favorites', icon: 'md-heart-empty', component: FavoritesScreen },
  { name: 'Search', icon: 'md-search', component: SearchScreen },
  { name: 'Create', icon: 'md-add', component: CreateScreen }
]

const getFonts = () => Font.loadAsync({
  Raleway: Raleway_400Regular,
  'Raleway-bold': Raleway_700Bold,
  Lobster: Lobster_400Regular
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if(!fontsLoaded) {
    return <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)} />
  }

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
