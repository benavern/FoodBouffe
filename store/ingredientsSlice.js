import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'

const ingredientsRef = db.collection('ingredients')

function handleRejection (state, { error }) {
  console.error('Operation failed', error.message)
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const snap = await ingredientsRef.get()

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }
)

export const createIngredient = createAsyncThunk(
  'ingredients/createIngredient',
  async ingredient => {
    const newIngredient = await ingredientsRef.add({ ...ingredient })

    return {
      ...ingredient,
      id: newIngredient.id
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',

  initialState: [],

  reducers: {},

  extraReducers: {
    [fetchIngredients.fulfilled](state, { payload }) {
      // empty the state
      state.length = 0
      // then fill it
      state.push(...payload)
    },
    [fetchIngredients.rejected]: handleRejection,

    [createIngredient.fulfilled](state, { payload }) {
      state.push(payload)
    },
    [createIngredient.rejected]: handleRejection,
  }
})

export const { } = ingredientsSlice.actions
export default ingredientsSlice.reducer

export const ingredientsListSelector = state => state.ingredients
export const ingredientByIdSelector = state => ingredientId => state.ingredients.find(ing => ing.id === ingredientId)
