import { StyleSheet } from 'react-native';
import { colors, text } from './variables';

export default StyleSheet.create({
  bigTitle: {
    color: colors.text,
    fontSize: text.xl,
    fontFamily: 'Lobster'
  },
  title: {
    color: colors.text,
    fontSize: text.l,
    fontFamily: 'Lobster'
  },
  subtitle: {
    color: colors.textAlt,
    fontSize: text.m,
    fontFamily: 'Raleway'
  },
  textBold: {
    fontFamily: 'Raleway-bold'
  },
  text: {
    color: colors.text,
    fontSize: text.m,
    fontFamily: 'Raleway'
  },
  textAlt: {
    color: colors.textAlt,
    fontSize: text.m,
    fontFamily: 'Raleway'
  },
  textSecondary: {
    color: colors.secondary,
    fontSize: text.m,
    fontFamily: 'Raleway'
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: colors.background
  },
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.textAlt,
    backgroundColor: colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    color: colors.text,
    fontFamily: 'Raleway'
  },
  textInputFocus: {
    borderColor: colors.text
  }
})
