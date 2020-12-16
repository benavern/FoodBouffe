import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';

export default function EmptyList({ icon = 'emoji-sad', title = 'Aucune recette ici', subtitle = 'Créez une recette!' }) {
  return (
    <View style={globalStyle.fullCenter}>
      <Entypo name={icon} size={64} color={colors.textAlt} />

      <Text style={[globalStyle.title, styles.title]}>
        {title}
      </Text>

      <Text style={[globalStyle.subtitle, styles.subtitle]}>
        { subtitle }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: colors.warning,
    marginVertical: 20
  },
  subtitle: {
    textAlign: "center"
  }
})
