import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'
import { categoryByAppNameSelector } from "./categoriesSlice"
import { currentUserSelector, userByIdSelector } from "./userSlice"

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
    const newRecipe = {
      ...recipe,
      creationDate,
      authorRef: currentUser.id
    }
    const newRecipeDoc = await recipesRef.add(newRecipe)

    return {
      id: newRecipeDoc.id,
      ...newRecipe
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

export const latestRecipesSelector = ({ limit }) => createSelector(
  state => state.recipes,
  recipes => {
    const latestRecipes = [...recipes].sort((a,b) => b.creationDate - a.creationDate) // from most recent to older
    if (limit) return latestRecipes.slice(0, limit)
    return latestRecipes
  }
)

const recipesByCatAppNameSelector = catAppName => createSelector(
  categoryByAppNameSelector(catAppName),
  state => state.recipes,
  (category, recipes) => {
    if (!category) return []
    return recipes.filter(rec => rec.categoryRef === category.id)
  }
)

export const latestRecipesByCatAppNameSelector = ({ catAppName, limit }) => createSelector(
  recipesByCatAppNameSelector(catAppName),
  recipes => {
    const sortedCatRecipes = [...recipes].sort((a,b) => b.creationDate - a.creationDate) // from most recent to older
    if (limit) return sortedCatRecipes.slice(0, limit)
    return sortedCatRecipes
  }
)

export const recipesAlphabeticSelector = createSelector(
  state => state.recipes,
  recipes => [...recipes].sort((a, b) => a.name.localeCompare(b.name, 'fr')) // alphabetical order
)

export const recipesFavoritesAlphabeticSelector = userId => createSelector(
  userByIdSelector(userId),
  recipesAlphabeticSelector,
  (user, recipes) => {
    if(!user || !user.favorites) return []
    return recipes.filter(rec => user.favorites.some(fav => fav === rec.id))
  }
)

export const recipeByIdSelector = recipeId => createSelector(
  state => state.recipes,
  recipes => recipes.find(rec => rec.id === recipeId)
)

export const userByIdfavoriteRecipesCountSelector = userId => createSelector(
  userByIdSelector(userId),
  state => state.recipes,
  (user, recipes) => {
    if(!user || !user.favorites) return 0
    return user.favorites.filter(fav => recipes.some(rec => rec.id === fav)).length
  }
)
