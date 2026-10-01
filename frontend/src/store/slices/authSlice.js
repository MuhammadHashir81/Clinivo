import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../services/api'
import { data } from 'react-router-dom'



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

      const response = await api.get('/auth/check')
      console.log("checking if the user is logged in or not ", response.user)
      return {
        name:response.user.name,
        role:response.user.role
      }

    } catch (error) {

      return rejectWithValue(error.response?.data.error)

    }

})


// admin signup 
export const adminSignup = createAsyncThunk('users/admin/signup',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {

      const response = await api.post('/admin/signup', data)
      console.log("admin signup ", response)
      return response

    } catch (error) {

      return rejectWithValue(error.response?.data.error)

    }


})


// admin login
export const adminLogin = createAsyncThunk('users/admin/login',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {

      const response = await api.post('/admin/login', data)
      console.log("admin login", response)
      return response

    } catch (error) {

      return rejectWithValue(error.response?.data.error)

    }

})


// staff login 
export const staffLogin = createAsyncThunk('users/staff/login',async (data,{ rejectWithValue }) => {
  try {
    const result = await api.post('/staff/login',data)
    console.log(result)
    return {
          success:result.success,
          role:result.user.role      
  }

  } catch (error) {
    console.log(error?.response?.data?.error);
    
    return rejectWithValue(error?.response?.data?.error)
  }

})


export const authSlice = createSlice({
  name: 'auth', // here name is slice's property means redux property we give it as it is, like it is the name of slice 
  initialState: {
    loading: false,
    error: null,
    success: null,
    checkAuth: true,
    isAuthenticated: false,
    role: null,
    user:null

  },
  reducers: {
    clearError: (state) => {
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

      .addCase(signUp.rejected, (state, action) => {
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

      .addCase(logIn.rejected, (state, action) => {
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
        state.role = action.payload.role
        state.user = action.payload.name
      })

      .addCase(checkingAuth.rejected, (state, action) => {
        state.loading = false
        state.checkAuth = false
        state.isAuthenticated = false
      })


      // admin signup 

      .addCase(adminSignup.pending, (state, action) => {
        state.loading = true
      })

      .addCase(adminSignup.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
      })

      .addCase(adminSignup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // admin login
      .addCase(adminLogin.pending, (state, action) => {
        state.loading = true
        state.isAuthenticated = false
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
        state.isAuthenticated = true
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })


      // staff login 

      .addCase(staffLogin.pending, (state, action) => {
        state.loading = true
        state.isAuthenticated = false
      })

      .addCase(staffLogin.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
        state.role = action.payload.role
        state.isAuthenticated = true
      })

      .addCase(staffLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      
  }

})


export const { clearError } = authSlice.actions
export default authSlice.reducer