import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { formatDuration } from '../../helpers/date.helper'
import { colors, inputColor, text } from '../../styles/variables'
import globalStyle from '../../styles/globalStyle'

const MIN_VAL = 1
const MAX_VAL = 180

export default function DurationPicker({
  value = MIN_VAL,
  onChange,
  label,
  style
 }) {
  const [localValue, setLocalValue] = useState(value)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (value !== localValue) setLocalValue(value)
    if (!touched && value !== MIN_VAL) setTouched(true)
  }, [value])

  return (
    <View style={style}>
      {label &&
        <Text style={styles.label(touched)}>
          {label}
        </Text>
      }

      <Slider
        style={styles.slider(label)}
        minimumValue={MIN_VAL}
        maximumValue={MAX_VAL}
        step={1}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.textAlt}
        thumbTintColor={touched ? colors.primary : colors.textAlt}
        value={value}
        onValueChange={newVal => {
          setLocalValue(newVal)
          setTouched(true)
        }}
        onSlidingComplete={onChange} />

        <Text style={styles.labelValue(touched)}>
          {formatDuration(localValue)}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: (touched) => ({
    ...globalStyle.text,
    marginTop: 10,
    fontSize: text.s,
    color: inputColor(touched, touched)
  }),
  labelValue: (touched) => ({
    ...globalStyle.text,
    ...globalStyle.textBold,
    color: inputColor(touched, touched),
    backgroundColor: colors.cardBackground,
    paddingVertical: text.s / 2,
    paddingHorizontal: text.s,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 10
  }),
  slider: (label) => ({
    paddingTop: 10,
    marginTop: label ? (text.s / 2) : 10
  })
})
