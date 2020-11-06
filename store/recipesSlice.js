import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'

const recipesRef = db.collection('recipes')

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const recipesSnapshot = await recipesRef.get()

    return recipesSnapshot.map(snap => ({
      id: snap.id,
      ...snap.data
    }))
  }
)

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id) => {
    const snap = await recipesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No recipe exists with the id "${id}"`)
      return
    }

    return {
      id: snap.id,
      ...snap.data
    }
  }
)

const recipesSlice = createSlice({
  name: 'recipes',

  initialState: [],

  reducers: {
    addRecipe(state, {payload}) {
      state.push(payload)
    },

    toggleLikeRecipe(state, { payload }) {
      const recipe = state.find(rec => rec.id === payload.id)

      if(!recipe) {
        console.warn('This recipe does not exist.')
        return
      }
      recipe.like = !recipe.like
    },

    removeRecipe(state, { payload }) {
      return state.filter(rec => rec.id !== payload.id)
    }
  },

  extraReducers: {
    [fetchRecipes.fulfilled]: (state, { payload }) => {
      // empty the state
      state.length = 0
      // then fill it
      state.push(...payload)
    },
    [fetchRecipes.rejected]: (state, { error }) => {
      console.error('REJECTED!!!', error.message)
    },

    [fetchRecipeById.fulfilled]: (state, { payload }) => {
      const recipeFromState = state.find(rec => rec.id === payload.id)

      if (recipeFromState) {
        recipeFromState = payload
      } else {
        state.push(payload)
      }
    },
    [fetchRecipeById.rejected]: (state, { error }) => {
      console.error('REJECTED BY ID !!!', error.message)
    }
  }
})

export const { addRecipe, toggleLikeRecipe, removeRecipe } = recipesSlice.actions
export default recipesSlice.reducer
