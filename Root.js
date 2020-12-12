import React, { useEffect, useState } from 'react'
import Login from './screens/Auth/LoginScreen'
import SharedStack from './screens/Shared'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import { setCurrentUser } from './store/userSlice'
import { AppLoading } from 'expo'

import { loadAsync as loadFontAsync } from 'expo-font'
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'
import { LondrinaSolid_400Regular } from '@expo-google-fonts/londrina-solid'

import { NavigationContainer } from '@react-navigation/native'

import { enableScreens } from 'react-native-screens';
enableScreens();

const getFonts = () => loadFontAsync({
  Quicksand: Quicksand_400Regular,
  'Quicksand-bold': Quicksand_700Bold,
  Londrina: LondrinaSolid_400Regular
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
