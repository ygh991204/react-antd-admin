import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo as _getUserInfo,
  ApiLoginData,
  UserData
} from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export const login = createAsyncThunk('user/login', async(data: ApiLoginData) => {
  const res = await userLogin(data)
  return res.data
})

export const logout = createAsyncThunk('user/logout', async() => {
  try {
    const res = await userLogout()
    return res
  } catch(e) {
    return null
  }
})

export const getuserInfo = createAsyncThunk('user/userInfo', async() => {
  const res = await _getUserInfo()
  return res.data
})

interface UserState {
  user: Partial<UserData>
  token: string | null
  permissions: string[]
  loadMenus: boolean
}

const initialState: UserState = {
  user: {},
  token: null,
  permissions: [],
  loadMenus: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoadMenus(state, { payload }) {
      state.loadMenus = !!payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = { ...payload, roles: [] }
      state.token = payload.token
      setToken(payload.token)
      state.loadMenus = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null
      state.permissions = []
      removeToken()
    })
    builder.addCase(logout.rejected, (state) => {
      state.token = null
      state.permissions = []
      removeToken()
    })
    builder.addCase(getuserInfo.fulfilled, (state, { payload }) => {
      state.user = { ...payload }
      state.permissions = payload.permissions
    })
  }
})

export const { setLoadMenus } = userSlice.actions

export default userSlice.reducer
