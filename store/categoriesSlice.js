import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from '../firebase'

const categoriesRef = db.collection('categories')

function handleRejection (state, { error }) {
  console.error('Operation failed', error.message)
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const snap = await categoriesRef.get()

    return snap.docs.reduce((cats, cat) => {
      cats[cat.id] = cat.data()
      return cats
    }, {})
  }
)

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async id => {
    const snap = await categoriesRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No category exists with the id "${id}"`)
      return
    }

    return { id: snap.id, ...snap.data() }
  }
)

const categoriesSlice = createSlice({
  name: 'categories',

  initialState: {},

  reducers: {
    addCategory(state, { payload }) {
      const { id, ...category } = payload
      state[id] = category
    },

    removeCategory(state, { payload }) {
      delete state[payload]
    }
  },

  extraReducers: {
    [fetchCategories.fulfilled](state, { payload }) {
      Object.keys(state).forEach(oldCatId => delete state[oldCatId])
      Object.keys(payload).forEach(newCatId => state[newCatId] = payload[newCatId])
    },
    [fetchCategories.rejected]: handleRejection,

    [fetchCategoryById.fulfilled](state, { payload }) {
      const { id, ...category } = payload
      state[id] = category
    },
    [fetchCategoryById.rejected]: handleRejection,
  }
})

export const { addCategory, removeCategory } = categoriesSlice.actions
export default categoriesSlice.reducer

export const categoriesListSelector = state => Object.keys(state.categories).map(id => ({id, ...state.categories[id]}))

export const categoryByAppNameSelector = appName => state => {
    const categories = categoriesListSelector(state)
    return categories.find(cat => cat.appname === appName)
}
