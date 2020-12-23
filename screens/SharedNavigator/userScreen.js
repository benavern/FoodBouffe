import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ImagePicker from '../../components/ImagePicker'
import { Entypo } from '@expo/vector-icons'
import { editUser, currentUserSelector, logoutUser, userByIdSelector } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../components/Header'
import { userByIdfavoriteRecipesCountSelector } from '../../store/recipesSlice'

const defaultImage = require('../../assets/default-avatar.jpg')
const avatarSize = 250
const editImageBtnWidth = 80

export default function UserScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { params = {} } = useRoute()
  const { userId } = params

  const currentUser = useSelector(currentUserSelector)
  const user = useSelector(userByIdSelector(userId || currentUser.id)) // @TOFIX: this will get 2 references to the same user when userId does not exist...
  const favoritesCount = useSelector(userByIdfavoriteRecipesCountSelector(user.id))

  const [image, setImage] = useState(defaultImage)
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState({ pseudo: user.pseudo, avatar: user.avatar })

  useEffect(() => {
    let img
    if (editMode) {
      img = editedUser.avatar ? { uri: editedUser.avatar } : defaultImage
    } else {
      img = user.avatar ? { uri: user.avatar } : defaultImage
    }
    setImage(img)
  },[editMode, editedUser.avatar, user.avatar])

  function activateEditMode () {
    setEditedUser({ pseudo: user.pseudo, avatar: user.avatar })
    setEditMode(true)
  }

  function submitUserChange() {
    dispatch(editUser({id: user.id, avatar: editedUser.avatar || null, pseudo: editedUser.pseudo }))
    setEditMode(false)
  }

  const getPseudoError = () => {
    if (!editedUser.pseudo) return 'Pour vous reconnaître, les autre utilisateurs auront besoin de votre pseudo!'
    if (editedUser.pseudo.length < 3 || editedUser.pseudo.length > 25) return 'Votre pseudo doit faire entre 3 et 25 caractères'
    return null
  }

  return (
    <View style={globalStyle.screen}>
      <Header
        title="Informations utilisateur"
        subtitle={ user.id === currentUser.id ? 'Modifiez votre profil ou consultez vos favoris' : 'Apprenez à connaitre les autres foodBouffe!'}
        canGoBack />

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
                  <Entypo
                    name="brush"
                    color={colors.buttonText}
                    size={text.xl} />
                </ImagePicker>}
            </ImageBackground>

            {editMode
              ? <Input
                  style={{width: avatarSize}}
                  textAlign="center"
                  fontSize={text.l}
                  label="Pseudo"
                  placeholder="CookerDu35"
                  value={editedUser.pseudo}
                  onChange={newPseudo => setEditedUser(oldEditedUser => ({...oldEditedUser, pseudo: newPseudo}))}
                  error={getPseudoError()} />
              : <Text style={[globalStyle.bigTitle, styles.pseudo]}>
                  {user.pseudo}
                </Text>}

            {!editMode &&
              <View style={styles.aditionalInformation}>
                <Button
                  title={ `Favoris (${favoritesCount})` }
                  style={{ backgroundColor: colors.info }}
                  onPress={() => navigation.navigate('Favorites', { userId: user.id })} />
              </View>
            }
          </View>
          { currentUser.id === user.id &&
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
          }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  aditionalInformation: {
    marginTop: 20,
    width: avatarSize
  },
  avatar: {
    alignItems: "center",
    borderColor: colors.overlay,
    borderRadius: avatarSize / 2,
    borderWidth: 5,
    height: avatarSize,
    justifyContent: 'center',
    overflow: "hidden",
    resizeMode: "cover",
    width: avatarSize
  },
  imagePicker: {
    alignItems: "center",
    backgroundColor: colors.overlay,
    borderRadius: editImageBtnWidth,
    height: editImageBtnWidth,
    justifyContent: "center",
    width: editImageBtnWidth
  },
  pseudo: {
    fontSize: text.xl,
    marginTop: 20
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  userInfo: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center'
  },
  userInfoWrapper: {
    ...globalStyle.bottomSection,
    flex: 1
  }
})
