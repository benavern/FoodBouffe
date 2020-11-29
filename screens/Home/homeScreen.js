import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../styles/globalStyle';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../../store/recipesSlice';
import { homeLimit } from '../../config/foodbouffe.json'
import HomeCarousel from './HomeCarousel';

export default function HomeScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  return (
    <ScrollView>
      <SafeAreaView style={globalStyle.screen}>
        <HomeCarousel categoryAppname="salted" limit={homeLimit} />

        <HomeCarousel categoryAppname="sweet" limit={homeLimit} />
      </SafeAreaView>
    </ScrollView>
  );
}
