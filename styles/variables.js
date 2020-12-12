import { Appearance } from "react-native-appearance";

export const colorScheme = Appearance.getColorScheme();

export const darkmode = colorScheme === 'dark';

const originalColors = {
  primary: '#f1c40f',
  text: '#272D2F',
  textAlt: '#979797',
  background: '#F4F4F4',
  cardBackground: '#FFF',
  buttonText: '#F4F4F4',
  overlay: 'rgba(200, 200, 200, 0.5)',
  success: '#1EAA30',
  warning: '#FE724C',
  danger: '#CB2431',
  info: '#1E6FAA'
}

export const colors = darkmode
? {
    ...originalColors,
    primary: '#a08b2b',
    text: '#b6b7b8',
    textAlt: '#7a7d7f',
    background: '#16191c',
    cardBackground: '#1e2126',
    overlay: 'rgba(40, 41, 48, 0.5)',
    success: '#3c5c3d',
    warning: '#754718',
    danger: '#803535',
    info: '#187175'
  }
  : originalColors

export const text = {
    xl: 32,
    l: 20,
    m: 13,
    s: 10
}

export const inputHeight = 48

export const inputColor = (touched, active, error) => {
  if(touched && error) return colors.danger
  if(active) return colors.primary
  return colors.textAlt
}

export const categoryColor = ({color, darkColor}) => {
  if(darkmode) return darkColor || color || colors.primary
  return color || colors.primary
}

export const randomColor = () => {
  return `hsl( ${Math.floor(Math.random() * 360)}, 100%, 50%)`
}

export const pageHorizontalPadding = 10
