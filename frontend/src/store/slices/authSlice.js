import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../services/api'



export const signUp = createAsyncThunk('/auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/signup', data)
    return response.success
    
  }
  catch (error) {
    console.log(error.response.data.error)
    return rejectWithValue(error.response.data.error)
  }

})


export const logIn = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', data)
    console.log(data)
    return response.success
    
  }
  catch (error) {
    console.log(error)

    console.log(error.response.data.error)
    return rejectWithValue(error.response.data.error)
  }

})


// check auth- check if the user is logged in or not 

export const checkingAuth = createAsyncThunk('users/checkingAuth',
  async (_, { rejectWithValue }) => {
    try {

      const response = await api.get('/api/auth/check')
      console.log("checking if the user is logged in or not ", response)
      return response

    } catch (error) {

      return rejectWithValue(error.response?.data.error)

    }

})



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    success:null,
    checkAuth:true,
    isAuthenticated:false,
    role:null

  },
  reducers:{
    clearError: (state) =>{
      state.error = null
      state.success = null
    }
      
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload
      })

      .addCase(signUp.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })

      .addCase(logIn.pending, (state, action) => {
        state.loading = true
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload
      })

      .addCase(logIn.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
      
      .addCase(checkingAuth.pending, (state, action) => {
        state.loading = true
        state.checkAuth = true
      })

      .addCase(checkingAuth.fulfilled, (state, action) => {
        state.loading = false
        state.checkAuth = false
        state.isAuthenticated = true
      })
      
      .addCase(checkingAuth.rejected,(state,action)=>{
        state.loading = false
        state.checkAuth = false
        state.isAuthenticated = false
      })

  }

})


export const { clearError }  = authSlice.actions 
export default authSlice.reducer