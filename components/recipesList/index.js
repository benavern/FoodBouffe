import React from 'react';
import { StyleSheet } from 'react-native';
import List from '../List';
import RecipeItem from './recipeItem';

export default function RecipeList ({ items, horizontal, nbPerRow=2 }) {
  return (
    <List
      items={items}
      style={[
        styles.list,
        { minHeight: horizontal ? 215 : 'auto' }
      ]}
      horizontal={horizontal}
      renderItem={({item, width, gutter}) => <RecipeItem item={item} style={{ width, margin: gutter}} />}
      gutter={6}
      nbPerRow={nbPerRow} />
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10
  }
});
