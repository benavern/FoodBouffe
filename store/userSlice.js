import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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

const userSlice = createSlice({
  name: 'user',

  initialState: {
    authReady: false,
    loggedIn: false,
    currentUserUid: '',
    users: []
  },

  reducers: {
    setAuthReady(state, { payload = false }) {
      return { ...state, authReady: payload }
    },
    setUser(state, { payload }) {
      if (payload) {
        state.loggedIn = true
        state.currentUserUid = payload.uid
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

    [editUser.fulfilled](state, { payload }) {
      const currentUser = state.users.find(user => user.id === payload.id)
      currentUser.avatar = payload.avatar
      currentUser.pseudo = payload.pseudo
    },
    [editUser.rejected]: handleRejection
  }
})

export const { setAuthReady, setUser } = userSlice.actions
export default userSlice.reducer

export const currentUserSelector = state => {
  const uid = state.user.currentUserUid
  return state.user.users.find(user => user.uid === uid)
}
