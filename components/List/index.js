import React from 'react'
import { Dimensions, View } from 'react-native'
import { FlatList } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import PullToRefresh from '../PullToRefresh'

const { width: screenWidth } = Dimensions.get('screen')
const listWidth = screenWidth - (globalStyle.screen.paddingHorizontal * 2)

export default function List({
  items,
  nbPerRow = 1,
  gutter = 10,
  horizontal,
  style,
  renderItem
}) {

  // when horizontal, display 1/4 extra of an item so that it is obvious that the user can scroll
  const nbVisible = horizontal ? nbPerRow + 0.25 : nbPerRow
  const itemWidth = (listWidth  - (gutter * 2 * nbVisible - gutter * 2)) / nbVisible

  // Only snap to each item when horizontal
  const snapToInterval = horizontal && itemWidth + gutter * 2

  function _formatData (data, colNb, horizontal) {
    if (horizontal) return data

    let nbLastRow = data.length % colNb
    const cols = [...data]

    if (nbLastRow) {
      for (let i = 0; i < colNb - nbLastRow; i++) {
        cols.push({ id: `blank-${i}`, hidden: true })
      }
    }

    return cols
  }

  function _renderItem({ item, width, gutter }) {
    if (item.hidden) {
      return <View style={{ width, margin: gutter, opacity: 0 }} />
    }

    return renderItem({ item, width, gutter })
  }

  return (
    <FlatList
      data={_formatData(items, nbPerRow, horizontal)}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={horizontal}
      snapToInterval={snapToInterval}
      bounces={horizontal}
      style={[{ marginHorizontal: -gutter }, style]}
      renderItem={(args) => _renderItem({ ...args, width: itemWidth, gutter })}
      numColumns={horizontal ? undefined : nbPerRow}
      refreshControl={horizontal ? null : <PullToRefresh offset={false} />}/>
  )
}
