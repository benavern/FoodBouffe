import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import RecipeItem from './recipeItem'
import EmptyList from '../emptyList'
import PullToRefresh from '../PullToRefresh'

const pagePadding = globalStyle.screen.paddingHorizontal
const { width: screenWidth } = Dimensions.get('screen')
const listWidth = screenWidth - 2 * pagePadding

export default function List({
  items,
  nbPerRow = 2,
  gutter = 10,
  horizontal,
  style,
  contentContainerStyle,
  header,
  emptyIcon,
  emptyTitle,
  emptySubtitle
}) {

  // when horizontal, display 1/4 extra of an item so that it is obvious that the user can scroll
  const nbVisible = horizontal ? nbPerRow + 0.25 : nbPerRow
  const itemWidth = (listWidth - gutter) / nbVisible

  const isEmpty = !horizontal && !items.length

  return (
    <FlatList
      data={items}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={horizontal}
      snapToInterval={horizontal && itemWidth + gutter}
      bounces={horizontal}
      style={style}
      contentContainerStyle={[contentContainerStyle, styles.contentContainerStyle(isEmpty)]}
      renderItem={({ item, index }) => {
        const indexOnLine = horizontal ? index : index % nbPerRow
        const isLastOnRow = horizontal ? index === items.length - 1 : indexOnLine === nbPerRow - 1

        let marginRight = isLastOnRow ? 0 : gutter

        // Add margin on the last item to fills the last row
        if (!horizontal && !isLastOnRow && index === items.length - 1) {
          marginRight = itemWidth * (indexOnLine + 1) + gutter
        }

        return (
          <RecipeItem item={item} style={{ width: itemWidth, marginRight, marginBottom: horizontal ? 0 : gutter }} />
        )}
      }
      numColumns={horizontal ? undefined : nbPerRow}
      refreshControl={horizontal ? null : <PullToRefresh offset={true} />}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyList
        icon={emptyIcon}
        title={emptyTitle}
        subtitle={emptySubtitle} />
      } />
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: (empty) => ({
    flex: empty ? 1 : undefined // because it is a flatlist, it can be heigher than the screen!
  })
})
