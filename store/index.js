import { configureStore } from '@reduxjs/toolkit'
import recipesSlice from './recipesSlice'

export default configureStore({
  reducer: {
    recipes: recipesSlice
  }
})
