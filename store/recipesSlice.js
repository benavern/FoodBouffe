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

export const changeImageRecipe = createAsyncThunk(
  'recipes/changeImageRecipe',
  async ({id, image}) => {
    const snap = await recipesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No recipe exists with the id "${id}"`)
      return
    }

    await recipesRef.doc(id).set({ image }, { merge: true })

    return { id: snap.id, image }
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

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async id => {
    await recipesRef.doc(id).delete()
    return { id }
  }
)

const recipesSlice = createSlice({
  name: 'recipes',

  initialState: [],

  reducers: {},

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

    [changeImageRecipe.fulfilled](state, { payload }) {
      const recipe = state.find(rec => rec.id === payload.id)
      recipe.image = payload.image
    },
    [changeImageRecipe.rejected]: handleRejection,

    [createRecipe.fulfilled](state, { payload }) {
      state.push(payload)
    },
    [createRecipe.rejected]: handleRejection,

    [deleteRecipe.fulfilled](state, { payload }) {
      return state.filter(rec => rec.id !== payload.id)
    },
    [deleteRecipe.rejected]: handleRejection
  }
})

export const { removeRecipe } = recipesSlice.actions
export default recipesSlice.reducer

export const favoriteRecipesSelector = state => {
  const uid = state.user.currentUserUid
  const user = state.user.users.find(user => user.uid === uid)

  if(!user || !user.favorites) return []

  return state.recipes.filter(rec => user.favorites.some(fav => fav === rec.id))
}

export const recipesCountSelector = state => state.recipes.length
