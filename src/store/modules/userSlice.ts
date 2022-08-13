import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as userLogin, logout as userLogout, getUserInfo, ApiLoginData } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import AdminAvater from '@/assets/images/admin_avater.png'
import UserAvater from '@/assets/images/user_avater.png'

export const login = createAsyncThunk('user/login', async(data: ApiLoginData) => {
  const res = await userLogin(data)
  return res.data
})

export const logout = createAsyncThunk('user/logout', async() => {
  const res = await userLogout()
  return res
})

export const userInfo = createAsyncThunk('user/userInfo', async() => {
  const res = await getUserInfo()
  return res.data
})

interface UserState {
  user: Partial<Api.UserDb & Api.RoleDb>
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
      state.user = { ...payload, avater: payload.role === 'admin' ? AdminAvater : UserAvater }
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
    builder.addCase(userInfo.fulfilled, (state, { payload }) => {
      state.user = { ...payload, avater: payload.role === 'admin' ? AdminAvater : UserAvater }
      state.permissions = payload.permissions
    })
  }
})

export const { setLoadMenus } = userSlice.actions

export default userSlice.reducer
