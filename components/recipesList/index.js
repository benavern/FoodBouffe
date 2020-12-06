import React from 'react';
import List from '../List';
import RecipeItem from './recipeItem';

export default function RecipeList ({ items, horizontal, nbPerRow=2 }) {
  return (
    <List
      items={items}
      style={{ minHeight: horizontal ? 215 : 'auto' }}
      horizontal={horizontal}
      renderItem={({item, width, gutter}) => <RecipeItem item={item} style={{ width, margin: gutter}} />}
      gutter={6}
      nbPerRow={nbPerRow} />
  );
}
