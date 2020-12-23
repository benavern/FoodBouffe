import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../../styles/variables'

const makeIcon = ({ name, size, color }) => <Entypo name={name} size={size} color={color} />

export default function({
  activeTintColor,
  inactiveTintColor,
  style,
  tabStyle,
  state,
  descriptors,
  navigation
  }) {
  const ICON_SIZE = 24
  const { routes, index: activeRouteIndex } = state

  return (
    <View style={[style, styles.container]}>
      {routes.map((route, routeIndex) => {
        const { options } = descriptors[route.key]
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isRouteActive && !event.defaultPrevented) navigation.navigate(route.name)
        }

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={routeIndex}
            style={[tabStyle, styles.tabButton]}
            onPress={onPress}>
            {options.tabBarIcon({ color: tintColor, size: ICON_SIZE })}
          </TouchableOpacity>
        )
      })}

      <TouchableOpacity
        activeOpacity={0.9}
        style={[tabStyle, styles.tabButton]}
        onPress={() => {navigation.navigate('User')}}>
        {makeIcon({ name: 'v-card', color: inactiveTintColor, size: ICON_SIZE })}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.textAlt,
    borderTopWidth: 0.5,
    flexDirection: "row",
    height: 52
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});
