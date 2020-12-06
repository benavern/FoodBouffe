import { StyleSheet } from 'react-native';
import { colors, text } from './variables';

const titleFont = 'Londrina'
const normalFont = 'Quicksand'
const normalBoldFont = 'Quicksand-bold'

export default StyleSheet.create({
  bigTitle: {
    color: colors.text,
    fontSize: text.xl,
    fontFamily: titleFont
  },
  title: {
    color: colors.text,
    fontSize: text.l,
    fontFamily: titleFont
  },
  subtitle: {
    color: colors.textAlt,
    fontSize: text.m,
    fontFamily: normalFont
  },
  textBold: {
    fontFamily: normalBoldFont
  },
  text: {
    color: colors.text,
    fontSize: text.m,
    fontFamily: normalFont
  },
  textAlt: {
    color: colors.textAlt,
    fontSize: text.m,
    fontFamily: normalFont
  },
  textSecondary: {
    color: colors.secondary,
    fontSize: text.m,
    fontFamily: normalFont
  },
  textDanger: {
    color: colors.danger,
    fontSize: text.m,
    fontFamily: normalFont
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
  section: {
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBackground
  }
})
