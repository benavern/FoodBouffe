import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { loginUser } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'

const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/

export default function LoginScreen () {
  const [formData, setFormData] = useState({email: '', password: '', error: ''})
  const passwordField = useRef(null)
  const dispatch = useDispatch()

  const getEmailError = () => {
    if (!formData.email) return 'Votre email est requis pour pouvoir vous connecter'
    if (!emailRegex.test(formData.email)) return 'Vous devez rentrer un email valide pour vous connecter'
    return null
  }

  const getPasswordError = () => {
    if (!formData.password) return 'Votre mot de passe est requis pour pouvoir vous connecter'
    if (formData.password.length < 6) return 'Vous devez entrer un mot de passe d\'au moins 6 caractères'
    return null
  }

  const formValid = () => !getEmailError() && !getPasswordError()

  function submitForm() {
    dispatch(loginUser({email: formData.email, password: formData.password}))
      .then(unwrapResult)
      .catch(() => {
        setFormData({email: '', password: '', error: 'Votre email ou mot de passe est invalide.' })
      })
  }

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Connection
        </Text>
        <Text style={globalStyle.subtitle}>
          Pas de compte, pas de recette :)
        </Text>
      </View>

      <View style={styles.loginForm}>
        {formData.error !== '' &&
          <Text style={styles.loginFormError}>{formData.error}</Text>}

        <Input
          label="Email"
          placeholder="salade@tomates.oignons"
          value={formData.email}
          keyboardType="email-address"
          returnKeyType="next"
          onChange={newEmail => setFormData(oldData => ({ ...oldData, email: newEmail, error: '' }))}
          onSubmit={() => passwordField.current.focus()}
          error={getEmailError()} />

        <Input
          ref={passwordField}
          label="Mot de passe"
          placeholder="********"
          secureTextEntry
          value={formData.password}
          onChange={newPassword => setFormData(oldData => ({ ...oldData, password: newPassword, error: '' }))}
          onSubmit={() => submitForm()}
          error={getPasswordError()} />

        <Button
          title="Se connecter"
          onPress={() => submitForm()}
          disabled={!formValid()} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginForm: {
    flex: 1,
    justifyContent: "center"
  },
  loginFormError: {
    ...globalStyle.text,
    color: colors.danger
  }
})
