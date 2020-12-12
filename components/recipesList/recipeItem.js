import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import globalStyle from '../../styles/globalStyle'
import { Ionicons } from '@expo/vector-icons'
import Card from '../card'
import { categoryColor, colors, text } from '../../styles/variables'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { userByIdSelector, userLikesRecipeSelector } from '../../store/userSlice'
import Pill from '../Pill'
import Author from '../Author'
import { categoryByIdSelector } from '../../store/categoriesSlice'

const defaultImage = require('../../assets/default-background.jpg')

export default function RecipeItem ({ style = {}, item = { hidden: true } }) {
  const navigation = useNavigation()

  const category = useSelector(categoryByIdSelector(item.categoryRef))
  const like = useSelector(userLikesRecipeSelector(item.id))
  const author = useSelector(userByIdSelector(item.authorRef))

  const cardHeader = (
    <>
      <Image
        source={item.image ? { uri: item.image } : defaultImage}
        style={styles.headerImage}
        />

      <Author user={author} avatarOnly style={{ position: 'absolute', bottom: -5, alignSelf: 'center' }} />
    </>
  )

  const cardFooter = (
    <View style={styles.cardFooter}>
      <View>
        { category &&
          <Pill style={{backgroundColor: categoryColor(category)}}>
            {category.name}
          </Pill>
        }
      </View>

      <Ionicons
        name={like ? 'md-heart' : 'md-heart-empty'}
        size={text.l}
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
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    // flex: 1
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
    justifyContent: "space-between",
    alignItems: "center"
  }
})
