import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'

const recipesRef = db.collection('recipes')

function handleRejection (state, { error }) {
  console.error('Operation failed', error.message)
}

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const snap = await recipesRef.get()
    return snap.docs.map(rec => ({
      id: rec.id,
      ...rec.data()
    }))
  }
)

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async id => {
    const snap = await recipesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No recipe exists with the id "${id}"`)
      return
    }

    return {
      id: snap.id,
      ...snap.data()
    }
  }
)

export const toggleLikeRecipe = createAsyncThunk(
  'recipes/fetchRecipeById',
  async id => {
    const snap = await recipesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No recipe exists with the id "${id}"`)
      return
    }

    const newLike = !snap.data().like

    await recipesRef.doc(id).set({
      like: newLike
    }, { merge: true })

    return {
      id: snap.id,
      like: newLike
    }
  }
)

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async recipe => {
    const newRecipe = await recipesRef.add(recipe)
    return {
      id: newRecipe.id,
      ...recipe
    }
  }
)

const recipesSlice = createSlice({
  name: 'recipes',

  initialState: [],

  reducers: {
    removeRecipe(state, { payload }) {
      return state.filter(rec => rec.id !== payload.id)
    }
  },

  extraReducers: {
    [fetchRecipes.fulfilled](state, { payload }) {
      // empty the state
      state.length = 0
      // then fill it
      state.push(...payload)
    },
    [fetchRecipes.rejected]: handleRejection,

    [fetchRecipeById.fulfilled](state, { payload }) {
      let recipeFromState = state.find(rec => rec.id === payload.id)

      if (recipeFromState) {
        recipeFromState = payload
      } else {
        state.push(payload)
      }
    },
    [fetchRecipeById.rejected]: handleRejection,

    [toggleLikeRecipe.fulfilled](state, { payload }) {
      const recipe = state.find(rec => rec.id === payload.id)
      recipe.like = payload.like
    },
    [toggleLikeRecipe.rejected]: handleRejection,

    [createRecipe.fulfilled](state, { payload }) {
      state.push(payload)
    },
    [createRecipe.rejected]: handleRejection
  }
})

export const { removeRecipe } = recipesSlice.actions
export default recipesSlice.reducer
