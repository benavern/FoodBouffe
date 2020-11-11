import React from 'react';
import { Dimensions, View } from 'react-native';
import { FlatList } from 'react-native';
import globalStyle from '../../styles/globalStyle';

const { width: windowWidth } = Dimensions.get('window');
const listWidth = windowWidth - (globalStyle.screen.paddingHorizontal );

export default function List({
  items,
  nbPerRow = 1,
  gutter = 10,
  style,
  renderItem
}) {
  const itemWidth = (listWidth  - (gutter * 2 * nbPerRow)) / nbPerRow;

  function _formatData (data, colNb) {
    let nbLastRow = data.length % colNb;

    const cols = [...data];

    if (nbLastRow) {
      for (let i = 0; i < colNb - nbLastRow; i++) {
        cols.push({ id: `blank-${i}`, hidden: true })
      }
    }

    return cols;
  }

  function _renderItem({ item, width, gutter }) {
    if (item.hidden) {
      return <View style={{ width, margin: gutter, opacity: 0 }} />
    }

    return renderItem({ item, width, gutter })
  }

  return (
    <FlatList
      data={_formatData(items, nbPerRow)}
      style={[{ marginHorizontal: -gutter }, style]}
      renderItem={(args) => _renderItem({ ...args, width: itemWidth, gutter })}
      numColumns={nbPerRow} />
  );
}
