import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default forwardRef(
  function Input({
    placeholder,
    onChange,
    value = '',
    keyboardType = 'default',
    returnKeyType,
    returnKeyLabel,
    maxLength,
    onFocus,
    onBlur,
    onSubmit,
    label,
    style,
    disabled
  }, ref) {
    const [inputFocused, setInputFocused] = useState(false)
    const [inputActive, setInputActive] = useState(false)

    useEffect(() => {
      setInputActive(!disabled && (!!value || inputFocused))
    }, [value, inputFocused])

    return (
      <View style={style}>
        {label && <Text style={[globalStyle.text, styles.label, inputActive && styles.labelFocus]}>{label}</Text>}

        <TextInput
          ref={ref}
          style={[styles.input, inputActive && styles.inputFocused, label && styles.inputWithLabel]}
          value={(value||'').toString()}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textAlt}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          maxLength={maxLength}
          onSubmitEditing={onSubmit}
          disabled={disabled}
          onFocus={(e) => { setInputFocused(true); onFocus && onFocus(e); }}
          onBlur={(e) => { setInputFocused(false); onBlur && onBlur(e); }}/>
      </View>
    );
  }
)

const blurColor = colors.textAlt
const focusColor = colors.primary

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: blurColor,
    backgroundColor: colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    color: colors.text,
    fontFamily: 'Raleway'
  },
  inputFocused: {
    borderColor: focusColor
  },
  inputWithLabel: {
    marginTop: text.s / 2
  },
  label: {
    marginTop: 10,
    fontSize: text.s,
    color: blurColor
  },
  labelFocus: {
    color: focusColor
  },
})
