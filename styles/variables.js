import { Appearance } from "react-native-appearance";

const colorScheme = Appearance.getColorScheme();

export const darkmode = colorScheme === 'dark';

const originalColors = {
  primary: '#FFC529',
  secondary: '#FE724C',
  text: '#272D2F',
  textAlt: '#A7A7A7',
  cardBackground: '#fff',
  background: '#F4F4F4'
}

export const colors = darkmode
  ? {
    ...originalColors,
    text: '#bd93f9',
    textAlt: '#6272a4',
    background: '#282A36',
    cardBackground: 'rgba(255, 255, 255, .05)'
  }
  : originalColors

export const text = {
    xl: 24,
    l: 18,
    m: 12,
    s: 8
}
