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
  section: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBackground
  }
})
