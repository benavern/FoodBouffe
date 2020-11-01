import React from 'react';
import { Text, View } from 'react-native';
import globalStyle from '../../styles/globalStyle';

export default function CreateScreen({ navigation }) {
  return (
    <View style={globalStyle.screen}>
      <Text>
        Create
      </Text>
    </View>
  );
}
