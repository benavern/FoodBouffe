import React, { forwardRef, useState } from 'react'
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
    label
  }, ref) {
    const [inputUsed, setInputUsed] = useState(false)

    return (
      <View>
        {label && <Text style={[globalStyle.text, styles.label, inputUsed && styles.labelFocus]}>{label}</Text>}

        <TextInput
          ref={ref}
          style={[styles.input, inputUsed && styles.inputFocused, label && styles.inputWithLabel]}
          value={(value||'').toString()}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textAlt}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          returnKeyLabel={returnKeyLabel}
          maxLength={maxLength}
          onSubmitEditing={onSubmit}
          onFocus={(e) => { setInputUsed(true); onFocus && onFocus(e); }}
          onBlur={(e) => { setInputUsed(!!value); onBlur && onBlur(e); }}/>
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
