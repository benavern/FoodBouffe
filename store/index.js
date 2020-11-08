import { configureStore } from '@reduxjs/toolkit'
import recipesSlice from './recipesSlice'
import categoriesSlice from './categoriesSlice'

export default configureStore({
  reducer: {
    recipes: recipesSlice,
    categories: categoriesSlice
  }
})
