import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { colors, text } from '../../styles/variables'

export default function Input({ placeholder, onChange, value = '', returnKeyType, returnKeyLabel, onFocus, onBlur, label }) {
  const [inputUsed, setInputUsed] = useState(false)

  return (
    <View>
      {label && <Text style={[globalStyle.text, styles.label, inputUsed && styles.labelFocus]}>{label}</Text>}

      <TextInput
        style={[styles.input, inputUsed && styles.inputFocused, label && styles.inputWithLabel]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textAlt}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        onFocus={(e) => { setInputUsed(true); onFocus && onFocus(e); }}
        onBlur={(e) => { setInputUsed(!!value); onBlur && onBlur(e); }} />
    </View>
  );
}

const blurColor = colors.textAlt
const focusColor = colors.text

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: blurColor,
    backgroundColor: colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    color: focusColor,
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
