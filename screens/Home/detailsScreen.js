import React from 'react';
import { ImageBackground, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../styles/globalStyle';
import { colors } from '../../styles/variables';

export default function DetailsScreen ({ navigation, route }) {
  const { item } = route.params;

  function _formatDuration(duration) {
    if (typeof duration !== 'number') {
      return 'NA'
    }
    if (duration > 60) {
      const hrs = Math.floor(duration / 60);
      const mins = duration - hrs * 60
      return mins
        ? `${hrs} Heures ${mins} Mins`
        : `${hrs} Heures`
    }
    return `${duration} Mins`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scroller}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.coverImage}>
          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => navigation.popToTop()}>
            <Ionicons name="ios-arrow-back" color={colors.text} size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.coverBtn}
            onPress={() => console.log('ADD FAV', item.id)}>
            <Ionicons
              name={item.like ? 'md-heart' : 'md-heart-empty'}
              color={colors.primary}
              size={24} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={[globalStyle.screen, styles.detailsWrapper]}>
          <View style={[{ flexDirection: 'row', justifyContent: "space-between" }, styles.section]}>
            <View>
              <Text style={globalStyle.bigTitle}>{item.name}</Text>

              <Text style={globalStyle.subtitle}>{item.info}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-clock" color={colors.secondary} size={24} />

              <Text style={[{ marginLeft: 6 }, globalStyle.textAlt]}>{_formatDuration(item.prepDuration)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Ingrédients</Text>

            <View>
              <Text style={globalStyle.textAlt}>. truc</Text>
              <Text style={globalStyle.textAlt}>. machin</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[globalStyle.title, { marginBottom: 10 }]}>Recette</Text>

            <View>
              <Text style={globalStyle.textAlt}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quidem vitae quod fugit doloribus vel iure unde impedit, at facilis obcaecati eveniet nulla adipisci ad. Distinctio ullam quas totam provident.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    backgroundColor: colors.background
  },
  coverImage: {
    width: '100%',
    height: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  coverBtn: {
    backgroundColor: colors.background,
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 12
  },
  detailsWrapper: {
    flex: 1,
    paddingTop: 24,
    marginTop: -24,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBackground
  }
})
