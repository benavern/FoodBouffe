import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyle from '../../styles/globalStyle'
import { colors, inputColor, inputHeight, text } from '../../styles/variables'

export default forwardRef(
  function Select({
    onChange,
    value = null,
    label,
    nullLabel = '-',
    options = [],
    required,
    style,
    disabled,
    error
  }, ref) {
    const [inputActive, setinputActive] = useState(false)
    const [inputTouched, setInputTouched] = useState(false)

    useEffect(() => {
      setinputActive(!!value && !disabled)
    }, [value])

    return (
      <View style={style}>
        {label && <Text style={[globalStyle.text, styles.label(inputTouched, inputActive, error)]}>{label}</Text>}

        <View
          style={styles.input(inputTouched, inputActive, error, label)}>
          <Picker
            ref={ref}
            style={styles.picker}
            selectedValue={value}
            enabled={!disabled}
            onValueChange={e=> {
              setInputTouched(true)
              onChange(e)
            }}
            prompt={label}>
            { !required && <Picker.Item label={`- ${nullLabel} -`} value={null} /> }
            {options.map(opt => <Picker.Item label={opt.name} value={opt.id} key={opt.id} />)}
          </Picker>
        </View>

        {error && inputTouched && <Text style={[globalStyle.text, styles.error]}>{error}</Text>}
      </View>
    );
  }
)

const styles = StyleSheet.create({
  input: (error, label) => ({
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 6,
    marginTop: label ? (text.s / 2) : 10,
    marginBottom: error ? (text.s / 2) : 10,
  }),
  picker: {
    color: colors.text,
    height: Platform.select({ ios: 200, android: inputHeight}),
    fontFamily: 'Raleway',
    fontSize: text.m,
  },
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
