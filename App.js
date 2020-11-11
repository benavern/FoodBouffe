import 'react-native-gesture-handler'
import './firebaseTimeoutError.fix'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import Main from './Main.js'
import store from './store'
import { colors } from './styles/variables'


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={colors.overlay}/>

      <ActionSheetProvider>
        <Main />
      </ActionSheetProvider>
    </Provider>
  );
}
