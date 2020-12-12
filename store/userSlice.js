import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { db, auth } from '../firebase'

const usersRef = db.collection('users')

function handleRejection (state, { error }) {
  console.error('Operation failed', error.message)
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({email, password}) => {
    await auth.signInWithEmailAndPassword(email, password)
    return
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    await auth.signOut()
    return
  }
)

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const snap = await usersRef.get()

    return snap.docs.map(user => ({
      id: user.id,
      ...user.data()
    }))
  }
)

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async id => {
    const snap = await usersRef.doc(id).get()


    if (!snap.exists) {
      throw new Error(`No user exists with the id "${id}"`)
      return
    }

    return { id: snap.id, ...snap.data() }
  }
)

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ id, avatar, pseudo }) => {
    const snap = await usersRef.doc(id).get()

    if (!snap.exists) {
      throw new Error(`No user exists with the id "${id}"`)
      return
    }

    await usersRef.doc(id).set({ avatar, pseudo }, { merge: true })

    return { id: snap.id, avatar, pseudo }
  }
)

export const toggleLikeRecipe = createAsyncThunk(
  'user/toggleLikeRecipe',
  async (id, { getState }) => {
    const state = getState()
    const uid = state.user.currentUserUid
    const user = state.user.users.find(user => user.uid === uid)
    let like = false

    await db.runTransaction(async t => {
      const currentUserRef = usersRef.doc(user.id)
      const currentUserSnap = await t.get(currentUserRef)
      const { favorites } = currentUserSnap.data()
      like = !favorites.some(fav => fav === id)

      let newFavorites
      if (like) {
        newFavorites = [...favorites, id]
      } else {
        newFavorites = favorites.filter(fav => fav !== id)
      }

      await t.update(currentUserRef, { favorites: newFavorites })
    })

    return { id, like }
  }
)

const userSlice = createSlice({
  name: 'user',

  initialState: {
    loggedIn: false,
    currentUserUid: '',
    users: []
  },

  reducers: {
    setCurrentUser(state, { payload }) {
      if (payload) {
        state.loggedIn = true
        state.currentUserUid = payload
      } else {
        state.loggedIn = false
        state.currentUserUid = ''
      }
    }
  },

  extraReducers: {
    [loginUser.rejected](state) {
      state.loggedIn = false
      state.currentUserUid = ''

      const error = new Error('Login failed')
      handleRejection(state, { error })
    },

    [logoutUser.fulfilled](state) {
      state.loggedIn = false
      state.currentUserUid = ''
      state.users = []
    },
    [logoutUser.rejected]: handleRejection,

    [fetchUsers.fulfilled](state, { payload }) {
      state.users = payload
    },
    [fetchUsers.rejected]: handleRejection,

    [fetchUserById.fulfilled](state, { payload }) {
      let userFromState = state.users.find(u => u.id === payload.id)

      if(userFromState) {
        userFromState = payload
      } else {
        state.push(payload)
      }
    },
    [fetchUserById.rejected]: handleRejection,

    [editUser.fulfilled](state, { payload }) {
      const currentUser = state.users.find(user => user.id === payload.id)
      currentUser.avatar = payload.avatar
      currentUser.pseudo = payload.pseudo
    },
    [editUser.rejected]: handleRejection,

    [toggleLikeRecipe.fulfilled](state, { payload }) {
      const currentUser = state.users.find(user => user.uid === state.currentUserUid)
      if (payload.like) {
        currentUser.favorites = [...currentUser.favorites, payload.id]
      } else {
        currentUser.favorites = currentUser.favorites.filter(fav => fav !== payload.id)
      }
    },
    [toggleLikeRecipe.rejected]: handleRejection
  }
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer

export const currentUserSelector = createSelector(
  state => state.user.users,
  state => state.user.currentUserUid,
  (users, uid) => users.find(user => user.uid === uid)
)

export const userLikesRecipeSelector = recipeId => createSelector(
  currentUserSelector,
  currentUser => {
    if(!currentUser || !currentUser.favorites) return false
    return currentUser.favorites.some(fav => fav === recipeId)
  }
)

export const userByIdSelector = id => createSelector(
  state => state.user.users,
  users => users.find(user => user.id === id)
)
