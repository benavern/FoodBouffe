import 'react-native-gesture-handler'
import './firebaseTimeoutError.fix'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import RootNavigation from './RootNavigation'
import store from './store'
import { colors } from './styles/variables'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={colors.overlay}/>

      <ActionSheetProvider>
        <RootNavigation />
      </ActionSheetProvider>
    </Provider>
  );
}
