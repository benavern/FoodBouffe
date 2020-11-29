import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons'
import Card from '../card'
import { colors } from '../../styles/variables'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { userLikesRecipeSelector } from '../../store/userSlice'

const defaultImage = require('../../assets/default-background.jpg')

export default function RecipeItem ({ style = {}, item = { hidden: true } }) {
  const navigation = useNavigation()

  const category = useSelector(state => state.categories[item.categoryRef])
  const like = useSelector(userLikesRecipeSelector(item.id))

  if (item.hidden) {
    return (
      <Card style={[style, styles.item, styles.hiddenItem]} />
    )
  }

  const cardHeader = (
    <Image
      source={item.image ? { uri: item.image } : defaultImage}
      style={styles.headerImage}
      />
  )

  const cardFooter = (
    <View style={styles.cardFooter}>
      <View>
        { category && <Text style={[globalStyle.chips, {backgroundColor: category.color}]}>
          {category.name}
        </Text> }
      </View>

      <Ionicons
        name={like ? 'md-heart' : 'md-heart-empty'}
        size={24}
        color={colors.primary} />
    </View>
  )

  return (
    <TouchableOpacity
      style={[style, styles.item]}
      activeOpacity={0.6}
      onPress={() => { navigation.navigate('Details', { recipeId: item.id }) }}>
      <Card
        key={item.id}
        style={{ flex: 1 }}
        coverImage={item.image}
        defaultCoverImage={defaultImage}
        itemId={item.id}
        header={cardHeader}
        headerStyle={styles.cardHeader}
        footer={cardFooter}>
        <Text style={globalStyle.title} numberOfLines={2}>
          {item.name}
        </Text>

        {/* <Text style={globalStyle.subtitle} numberOfLines={2}>
          {item.info}
        </Text> */}
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1
  },
  hiddenItem: {
    opacity: 0
  },
  cardHeader: {
    paddingHorizontal: 0,
    paddingTop: 0
  },
  headerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
