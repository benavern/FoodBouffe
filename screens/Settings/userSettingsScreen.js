import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ImagePicker from '../../components/ImagePicker'
import { Ionicons } from '@expo/vector-icons'
import { editUser, currentUserSelector, logoutUser } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

const defaultImage = require('../../assets/default-avatar.jpg')
const avatarSize = 250
const editImageBtnWidth = 80

export default function userSettingsScreen() {
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)
  const [image, setImage] = useState(defaultImage)
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState({ pseudo: currentUser.pseudo, avatar: currentUser.avatar })

  useEffect(() => {
    let img
    if (editMode) {
      img = editedUser.avatar ? { uri: editedUser.avatar } : defaultImage
    } else {
      img = currentUser.avatar ? { uri: currentUser.avatar } : defaultImage
    }
    setImage(img)
  },[editMode, editedUser.avatar, currentUser.avatar])

  function activateEditMode () {
    setEditedUser({ pseudo: currentUser.pseudo, avatar: currentUser.avatar })
    setEditMode(true)
  }

  function submitUserChange() {
    dispatch(editUser({id: currentUser.id, avatar: editedUser.avatar || null, pseudo: editedUser.pseudo }))
    setEditMode(false)
  }

  const getPseudoError = () => {
    if (!editedUser.pseudo) return 'Pour vous reconnaître, les autre utilisateurs auront besoin de votre pseudo!'
    if (editedUser.pseudo.length < 3 || editedUser.pseudo.length > 25) return 'Votre pseudo doit faire entre 3 et 25 caractères'
    return null
  }

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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.userInfo}>
            <ImageBackground
              style={styles.avatar}
              source={image}>
              {editMode &&
                <ImagePicker
                  style={styles.imagePicker}
                  directory="users"
                  aspect={[1,1]}
                  width={avatarSize}
                  onImage={newImage => setEditedUser(oldEditedUser => ({...oldEditedUser, avatar: newImage.uri}))}
                  onDelete={() => setEditedUser(oldEditedUser => ({...oldEditedUser, avatar: null}))}>
                  <Ionicons
                    name="md-create"
                    color={colors.buttonText}
                    size={32} />
                </ImagePicker>}
            </ImageBackground>

            {editMode
              ? <Input
                  style={{width: avatarSize}}
                  label="Pseudo"
                  placeholder="CookerDu35"
                  value={editedUser.pseudo}
                  onChange={newPseudo => setEditedUser(oldEditedUser => ({...oldEditedUser, pseudo: newPseudo}))}
                  error={getPseudoError()} />
              : <Text style={[globalStyle.text, globalStyle.textBold, styles.pseudo]}>
                  {currentUser.pseudo}
                </Text>}
          </View>

          <View>
            {editMode
              ? <>
                  <Button
                    title="Valider"
                    style={{ backgroundColor: colors.success }}
                    onPress={() => submitUserChange()}
                    disabled={getPseudoError()} />
                  <Button
                    title="Annuler"
                    style={{ backgroundColor: colors.danger }}
                    onPress={() => setEditMode(false)} />
                </>
              : <>
                  <Button
                    title="Modifier"
                    onPress={() => activateEditMode()} />
                  <Button
                    title="Déconnexion"
                    style={{ backgroundColor: colors.danger }}
                    onPress={() => { dispatch(logoutUser()) }} />
                </>}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userInfoWrapper: {
    paddingVertical: 10,
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
    overflow: "hidden",
    alignItems: "center",
    justifyContent: 'center'
  },
  imagePicker: {
    backgroundColor: colors.overlay,
    width: editImageBtnWidth,
    height: editImageBtnWidth,
    borderRadius: editImageBtnWidth,
    alignItems: "center",
    justifyContent: "center"
  },
  pseudo: {
    marginTop: 20,
    fontSize: text.xl
  }
})
