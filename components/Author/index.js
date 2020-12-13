import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'

const defaultAvatar = require('../../assets/default-avatar.jpg')

export default function Author ({ user = { pseudo: 'Nobody' }, avatarOnly, style, canGoToProfile }) {
  const navigation = useNavigation()
  let avatar = defaultAvatar

  if(user.avatar) {
    avatar = { uri: user.avatar }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('User', { userId: user.id })}
      disabled={!canGoToProfile}>
      <View style={[styles.author, style]}>
        <Image source={avatar} style={styles.avatar} />
        {!avatarOnly && <Text style={styles.pseudo}>{user.pseudo}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  author: {
    backgroundColor: colors.background,
    height: 32,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 10
  },
  pseudo: {
    ...globalStyle.title,
    paddingHorizontal: 16
  }
})
