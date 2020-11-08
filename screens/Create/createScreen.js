import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input'
import globalStyle from '../../styles/globalStyle';

export default function createScreen () {
  const [name, setName] = useState('')

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

      <View>
        <Input
          value={name}
          onChange={val => setName(val)}
          label="Nom de la recette" />
      </View>
    </SafeAreaView>
  );
}
