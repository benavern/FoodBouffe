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
    [logoutUser.fullfilled](state) {
      state.loggedIn = false
      state.currentUserUid = ''
    },
    [logoutUser.rejected]: handleRejection,

    [fetchUsers.fulfilled](state, { payload }) {
      state.users = payload
    },
    [fetchUsers.rejected]: handleRejection
  }
})

export const { setAuthReady, setUser } = userSlice.actions
export default userSlice.reducer

export const currentUserSelector = state => {
  const uid = state.user.currentUserUid
  return state.user.users.find(user => user.uid === uid)
}
