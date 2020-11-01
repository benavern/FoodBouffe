import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/card';
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';
import recepes from './recepes.json';

const gutter = 10;
const nbPerRow = 2;

export default function HomeScreen() {

  function _renderItem ({ item }) {
    if (item.hidden) {
      return (
        <Card style={[styles.item, styles.hiddenItem]} />
      )
    }

    const cardFooter = (
      <View style={styles.cardFooter}>
        <Text style={globalStyle.textAlt}>
          {item.category}
        </Text>

        <Ionicons
          name={item.like ? 'md-heart' : 'md-heart-empty'}
          size={24}
          color={colors.primary} />
      </View>
    )

    return (
      <Card
        key={item.id}
        style={styles.item}
        coverImage={item.image}
        footer={cardFooter}>
        <Text style={globalStyle.title}>
          {item.name}
        </Text>

        <Text style={globalStyle.subtitle}>
          {item.info}
        </Text>
      </Card>
    );
  }

  function _formatData (data, colNb) {
    let nbLastRow = data.length % colNb;

    if (nbLastRow) {
      for (let i = 0; i < colNb - nbLastRow; i++) {
        data.push({ id: `blank-${i}`, hidden: true })
      }
    }

    return data;
  }


  return (
    <SafeAreaView style={globalStyle.screen}>
      <View>
        <Text style={globalStyle.bigTitle}>
            Mes dernières recettes
        </Text>
        <Text style={globalStyle.subtitle}>
          Filtrer mes recettes pour mieux les retrouver
        </Text>
      </View>

      <FlatList
        data={_formatData(recepes, nbPerRow)}
        style={styles.list}
        renderItem={_renderItem}
        numColumns={nbPerRow} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: -gutter
  },
  item: {
    flex: 1,
    margin: gutter
  },
  hiddenItem: {
    opacity: 0
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
