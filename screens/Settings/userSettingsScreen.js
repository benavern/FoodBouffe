import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import { currentUserSelector, logoutUser } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default function userSettingsScreen() {
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Préférences utilisateur
        </Text>
        <Text style={globalStyle.subtitle}>
          Personnaliser mon compte utilisateur
        </Text>
      </View>

      <View style={styles.userInfoWrapper}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: currentUser.avatar }} />

          <Text style={[globalStyle.text, globalStyle.textBold, styles.pseudo]}>{currentUser.pseudo}</Text>
        </View>

        <View>
          <Button
            title="Déconnexion"
            style={{ backgroundColor: colors.secondary }}
            onPress={() => { dispatch(logoutUser()) }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const avatarSize = 250

const styles = StyleSheet.create({
  userInfoWrapper: {
    flex: 1,
    paddingVertical: 20
  },
  userInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    borderColor: colors.overlay,
    borderWidth: 5,
    resizeMode: "cover",
    overflow: "hidden"
  },
  pseudo: {
    marginTop: 20,
    fontSize: text.xl
  }
})
