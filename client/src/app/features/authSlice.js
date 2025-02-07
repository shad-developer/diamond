import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { toast } from 'react-toastify';

const initialState = {
  users:[],
  user: localStorage.getItem("auth_user")
    ? JSON.parse(localStorage.getItem("auth_user"))
    : null,
  isLoggedIn: localStorage.getItem("auth_user") !== null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkApi) => {
    try {
      const response = await authService.signup(userData);
      toast.success(response.message);
      return response; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//add user
export const addNewUser = createAsyncThunk(
  "auth/add-new-user",
  async (userData, thunkApi) => {
    try {
      const response = await authService.addNewUser(userData);
      toast.success(response.message);
      return response; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await authService.login(userData);
      toast.success(response.message);
      return response; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get user 

export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, thunkApi) => {
    try {
      const response = await authService.getUser();
      return response.user; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk(
  "auth/get-all-users",
  async (_, thunkApi) => {
    try {
      const response = await authService.getAllUsers();
      return response.users; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get user by id

export const getUserById = createAsyncThunk(
  "auth/get-user-by-id",
  async (id, thunkApi) => {
    try {
      const response = await authService.getUserById(id);
      return response.user; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// delete user

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkApi) => {
    try {
      const response = await authService.deleteUser(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// update user

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await authService.updateUser(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem("auth_user");
      return response; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("auth_user", JSON.stringify(action.payload));
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(addNewUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = false;
    })
    .addCase(addNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(getUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      localStorage.removeItem("user");
    })
    .addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = false;
      state.user = null;
      state.isError = false;
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.users = action.payload;
      state.totalUsers = action.payload?.length;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoggedIn = true;
      state.message = action.payload;
    })
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
  }
});

export const { setLoading, RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsSuccess = (state) => state.auth.isSuccess;
export const selectIsLoading = (state) => state.auth.isLoading;
export default authSlice.reducer;
