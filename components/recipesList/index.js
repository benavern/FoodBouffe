import React from 'react';
import { StyleSheet } from 'react-native';
import List from '../List';
import RecipeItem from './recepeItem';

export default function RecipeList ({ items }) {
  return (
    <List
      items={items}
      style={styles.list}
      renderItem={({item, width, gutter}) => <RecipeItem item={item} style={{ width, margin: gutter}} />}
      nbPerRow={2} />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 10
  }
});
