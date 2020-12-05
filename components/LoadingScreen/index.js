import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'

export default function LoadingScreen({ startAsync, onFinish }) {

  useEffect(() => {
    (async () => {
      if(startAsync) await startAsync()
      if(onFinish) onFinish()
    })()
  }, [])

  return (
    <View style={[globalStyle.screen, styles.loadingWrapper]}>
      <Text style={globalStyle.bigTitle}>Chargement...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingWrapper: {
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
