import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../styles/globalStyle';


export default function createScreen () {

  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
          Créer une recette
        </Text>
        <Text style={globalStyle.subtitle}>
          Miam, on s'en lèche les babines!
        </Text>
      </View>
    </SafeAreaView>
  );
}
