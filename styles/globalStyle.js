import { StyleSheet } from 'react-native';
import { colors, text } from './variables';

export default StyleSheet.create({
  bigTitle: {
    color: colors.text,
    fontSize: text.xl,
    fontWeight: 'bold'
  },
  title: {
    color: colors.text,
    fontSize: text.l,
    fontWeight: 'bold'
  },
  subtitle: {
    color: colors.textAlt,
    fontSize: text.m
  },
  text: {
    color: colors.text,
    fontSize: text.m
  },
  textAlt: {
    color: colors.textAlt,
    fontSize: text.m
  },
  textSecondary: {
    color: colors.secondary,
    fontSize: text.m
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: colors.background
  }
})
