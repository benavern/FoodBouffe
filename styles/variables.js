import { Appearance } from "react-native-appearance";

const colorScheme = Appearance.getColorScheme();

export const darkmode = colorScheme === 'dark';

const originalColors = {
  primary: '#FFC529',
  secondary: '#FE724C',
  text: '#272D2F',
  textAlt: '#A7A7A7',
  cardBackground: '#FFFFFF',
  background: '#F4F4F4'
}

export const colors = darkmode
  ? {
    ...originalColors,
    text: '#ECECEC',
    textAlt: '#6B778D',
    background: '#202040',
    cardBackground: 'rgba(255, 255, 255, .05)'
  }
  : originalColors

export const text = {
    xl: 24,
    l: 18,
    m: 12,
    s: 8
}
