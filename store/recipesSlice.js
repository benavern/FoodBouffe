import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'
import { categoryByAppNameSelector } from "./categoriesSlice"

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

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({id, ...recipe}) => {
    const snap = await recipesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No recipe exists with the id "${id}"`)
      return
    }

    await recipesRef.doc(id).set(recipe)

    return {id, ...recipe}
  }
)

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (recipe, { getState }) => {
    const creationDate = Date.now()
    const state = getState()
    const currentUser = state.user.users.find(u => u.uid === state.user.currentUserUid)
    const newRecipe = await recipesRef.add({
      ...recipe,
      creationDate,
      authorRef: currentUser.id
    })

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

    [updateRecipe.fulfilled](state, { payload }) {
      const recipeIndex = state.findIndex(rec => rec.id === payload.id)
      state[recipeIndex] = payload
    },
    [updateRecipe.rejected]: handleRejection,

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

export const latestRecipesSelector = ({ limit }) => state => {
  const latestRecipes = [...state.recipes].sort((a,b) => b.creationDate - a.creationDate) //from most recent to older
  if (limit) return latestRecipes.slice(0, limit)
  return latestRecipes
}

export const latestRecipesByCatAppNameSelector = ({ catAppName, limit }) => state => {
  const {id: catRef} = categoryByAppNameSelector(catAppName)(state)
  if (!catRef) return []

  const catRecipes = state.recipes.filter(rec => rec.categoryRef === catRef)
  const sortedCatRecipes = [...catRecipes].sort((a,b) => b.creationDate - a.creationDate) //from most recent to older
  if (limit) return sortedCatRecipes.slice(0, limit)
  return sortedCatRecipes
}

export const recipeById = recipeId => state => state.recipes.find(rec => rec.id === recipeId)
