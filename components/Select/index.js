import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyle from '../../styles/globalStyle'
import { colors, inputHeight, text } from '../../styles/variables'

export default forwardRef(
  function Select({
    onChange,
    value = null,
    label,
    nullLabel = '-',
    options = [],
    required,
    style,
    disabled
  }, ref) {
    const [inputActive, setinputActive] = useState(false)

    useEffect(() => {
      setinputActive(!!value && !disabled)
    }, [value])

    return (
      <View style={style}>
        {label && <Text style={[globalStyle.text, styles.label, inputActive && styles.labelFocus]}>{label}</Text>}

        <View
          style={[styles.input, inputActive && styles.inputFocused, label && styles.inputWithLabel]}>
          <Picker
            ref={ref}
            style={styles.picker}
            dropdownIconColor={inputActive ? colors.primary : colors.textAlt}
            selectedValue={value}
            enabled={!disabled}
            onValueChange={onChange}
            prompt={label}>
            { !required && <Picker.Item label={`- ${nullLabel} -`} value={null} /> }
            {options.map(opt => <Picker.Item label={opt.name} value={opt.id} key={opt.id} />)}
          </Picker>
        </View>
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
    paddingHorizontal: 6,
    marginVertical: 10,
  },
  picker: {
    color: colors.text,
    height: Platform.select({ ios: 200, android: inputHeight}),
    fontFamily: 'Raleway',
    fontSize: text.m,
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
