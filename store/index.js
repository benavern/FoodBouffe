import { configureStore } from '@reduxjs/toolkit'
import recipesSlice from './recipesSlice'
import categoriesSlice from './categoriesSlice'
import userSlice from './userSlice'

export default configureStore({
  reducer: {
    recipes: recipesSlice,
    categories: categoriesSlice,
    user: userSlice
  }
})
