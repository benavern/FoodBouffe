import React, { useEffect, useState } from 'react'
import Login from './screens/Auth/LoginScreen'
import SharedStack from './screens/Shared'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import { setAuthReady, setUser } from './store/userSlice'
import { AppLoading } from 'expo'

import * as Font from 'expo-font'
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Lobster_400Regular } from '@expo-google-fonts/lobster'
import { NavigationContainer } from '@react-navigation/native'

const getFonts = () => Font.loadAsync({
  Raleway: Raleway_400Regular,
  'Raleway-bold': Raleway_700Bold,
  Lobster: Lobster_400Regular
})

export default function RootNavigation() {
  const [appReady, setAppReady] = useState(false)
  const {authReady, loggedIn} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userData => {
      let usefulUserData
      if(userData) {
        usefulUserData = { uid: userData.uid }
      }
      dispatch(setUser(usefulUserData))

      dispatch(setAuthReady(true))
    })
  }, [])

  if (!authReady && !appReady) {
    return <AppLoading
      startAsync={getFonts}
      onFinish={() => setAppReady(true)} />
  }

  if (!loggedIn) {
    return <Login />
  }

  return (
    <NavigationContainer>
      <SharedStack />
    </NavigationContainer>
  )
}
