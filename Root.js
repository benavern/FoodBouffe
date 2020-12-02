import React, { useEffect, useState } from 'react'
import Login from './screens/Auth/LoginScreen'
import SharedStack from './screens/Shared'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import { setCurrentUser } from './store/userSlice'
import { AppLoading } from 'expo'

import { loadAsync as loadFontAsync } from 'expo-font'
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Lobster_400Regular } from '@expo-google-fonts/lobster'
import { NavigationContainer } from '@react-navigation/native'

const getFonts = () => loadFontAsync({
  Raleway: Raleway_400Regular,
  'Raleway-bold': Raleway_700Bold,
  Lobster: Lobster_400Regular
})

let resolveAppReadyPromise = () => {}
const prepareApp = () => {
  return Promise.all([
    getFonts(),
    new Promise(resolve => { resolveAppReadyPromise = resolve })
  ])
}

export default function RootNavigation() {
  const [appReady, setAppReady] = useState(false)
  const { loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        const { uid } = userInfo
        dispatch(setCurrentUser(uid))
      }
      resolveAppReadyPromise()
    })
  }, [])

  if (!appReady) {
    return <AppLoading
      startAsync={prepareApp}
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
