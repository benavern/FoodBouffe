import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, inputColor, inputHeight, text } from '../../styles/variables'

export default forwardRef(
  function Input({
    placeholder,
    onChange,
    value = '',
    keyboardType = 'default',
    secureTextEntry,
    returnKeyType,
    returnKeyLabel,
    maxLength,
    onFocus,
    onBlur,
    onSubmit,
    label,
    style,
    disabled,
    multiline,
    error,
    textAlign,
    fontSize
  }, ref) {
    const [inputFocused, setInputFocused] = useState(false)
    const [inputActive, setInputActive] = useState(false)
    const [inputTouched, setInputTouched] = useState(false)

    useEffect(() => {
      setInputActive(!disabled && (!!value || inputFocused))
    }, [value, inputFocused])

    return (
      <View style={style}>
        {label && <Text style={[globalStyle.text, styles.label(inputTouched, inputActive, error)]}>{label}</Text>}

        <TextInput
          allowFontScaling={true}
          selectionColor={colors.primary}
          textAlign={textAlign}
          ref={ref}
          style={styles.input(error, label, multiline, fontSize)}
          value={(value||'').toString()}
          onChangeText={e => {
            setInputTouched(true)
            onChange(e)
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textAlt}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          maxLength={maxLength}
          onSubmitEditing={onSubmit}
          disabled={disabled}
          multiline={multiline}
          onFocus={e => {
            setInputFocused(true)
            onFocus && onFocus(e)
          }}
          onBlur={e => {
            setInputFocused(false)
            onBlur && onBlur(e)
          }}/>

        {error && inputTouched && <Text style={[globalStyle.text, styles.error]}>{error}</Text>}
      </View>
    );
  }
)

const styles = StyleSheet.create({
  input: (error, label, multiline, fontSize = text.m) => ({
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: label ? (text.s / 2) : 10,
    marginBottom: error ? (text.s / 2) : 10,
    color: colors.text,
    fontFamily: 'Raleway',
    fontSize,
    minHeight: multiline ? inputHeight * 1.5 : inputHeight
  }),
  label: (touched, active, error) => ({
    marginTop: 10,
    fontSize: text.s,
    color: inputColor(touched, active, error)
  }),
  error: {
    marginBottom: 10,
    fontSize: text.s,
    color: colors.danger
  }
})
