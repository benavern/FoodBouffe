import { Appearance } from "react-native-appearance";

export const colorScheme = Appearance.getColorScheme();

export const darkmode = colorScheme === 'dark';

const originalColors = {
  primary: '#f1c40f',
  secondary: '#FE724C',
  text: '#272D2F',
  textAlt: '#A7A7A7',
  background: '#F4F4F4',
  cardBackground: '#FFF',
  buttonText: '#F4F4F4',
  overlay: 'rgba(200, 200, 200, 0.5)',
  success: '#1EAA30',
  danger: '#CB2431',
  info: '#1E6FAA'
}

export const colors = darkmode
? {
    ...originalColors,
    text: '#ECECEC',
    textAlt: '#6B778D',
    background: '#202040',
    cardBackground: '#2c2c58',
    overlay: 'rgba(64, 64, 128, 0.5)'
  }
  : originalColors

export const text = {
    xl: 32,
    l: 20,
    m: 13,
    s: 10
}

export const inputHeight = 48
