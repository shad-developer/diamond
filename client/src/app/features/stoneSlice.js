import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stoneService from "../services/stoneService";
import { toast } from "react-toastify";

const initialState = {
  stones: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add Stones
export const addStone = createAsyncThunk(
  "stone/addStone",
  async (formData, thunkApi) => {
    try {
      const response = await stoneService.addStone(formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // get all stones
export const getAllStones = createAsyncThunk(
  "stone/getAllStones",
  async (_, thunkApi) => {
    try {
      const response = await stoneService.getAllStones();
      return response.stones;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // get client by id
export const getStoneById = createAsyncThunk(
  "stone/getStoneById",
  async (id, thunkApi) => {
    try {
      const response = await stoneService.getStoneById(id);
      return response.stone;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // delete stone

export const deleteStone = createAsyncThunk(
  "stone/deleteStone",
  async (id, thunkApi) => {
    try {
      const response = await stoneService.deleteStone(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // update stone
export const updateStone = createAsyncThunk(
  "stone/updateStone",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await stoneService.updateStone(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const stoneSlice = createSlice({
  name: "stone",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addStone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllStones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stones = action.payload;
      })
      .addCase(getAllStones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStoneById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoneById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stone = action.payload;
      })
      .addCase(getStoneById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateStone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateStone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteStone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = stoneSlice.actions;
export const selectIsLoading = (state) => state.stone.isLoading;
export const selectIsSuccess = (state) => state.stone.isSuccess;
export const selectIsError = (state) => state.stone.isError;
export default stoneSlice.reducer;
