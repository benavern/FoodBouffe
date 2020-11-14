import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { loginUser } from '../../store/userSlice'
import globalStyle from '../../styles/globalStyle'

const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/

export default function LoginScreen () {
  const [formData, setFormData] = useState({email: '', password: '', error: ''})
  const [formValid, setFormValid] = useState(false)
  const passwordField = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const valid = emailRegex.test(formData.email)
      && formData.password.length >= 6
      setFormValid(valid)
  }, [formData])

  function submitForm() {
    dispatch(loginUser({email: formData.email, password: formData.password}))
      .then(unwrapResult)
      .catch(() => {
        setFormData({email: '', password: '', error: 'Mot de passe invalide ou et cet utilisateur n\'existe pas.' })
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
          <Text style={globalStyle.textSecondary}>{formData.error}</Text>}

        <Input
          label="Email"
          placeholder="salade@tomates.oignons"
          value={formData.email}
          keyboardType="email-address"
          returnKeyType="next"
          onChange={newEmail => setFormData(oldData => ({ ...oldData, email: newEmail, error: '' }))}
          onSubmit={() => passwordField.current.focus()} />

        <Input
          ref={passwordField}
          label="Mot de passe"
          placeholder="********"
          secureTextEntry
          value={formData.password}
          onChange={newPassword => setFormData(oldData => ({ ...oldData, password: newPassword, error: '' }))}
          onSubmit={() => submitForm()}/>

        <Button
          title="Se connecter"
          onPress={() => submitForm()}
          disabled={!formValid} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginForm: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center"
  }
})
