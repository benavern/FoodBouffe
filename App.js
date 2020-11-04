import 'react-native-gesture-handler';
import './firebaseTimeoutError.fix';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles/variables';

import HomeScreen from './screens/Home';
import FavoritesScreen from './screens/Favorites';
import SearchScreen from './screens/Search';
import CreateScreen from './screens/Create';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', icon: 'md-home', component: HomeScreen },
  { name: 'Favorites', icon: 'md-heart-empty', component: FavoritesScreen },
  { name: 'Search', icon: 'md-search', component: SearchScreen },
  { name: 'Create', icon: 'md-add', component: CreateScreen }
]

export default function App() {
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
  );
}
