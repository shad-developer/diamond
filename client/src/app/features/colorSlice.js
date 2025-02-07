import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "../services/colorService";
import { toast } from "react-toastify";

const initialState = {
  colors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add color
export const addColor = createAsyncThunk(
  "color/addColor",
  async (name, thunkApi) => {
    try {
      const response = await colorService.addColor(name);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all colors
export const getColors = createAsyncThunk(
  "color/getColors",
  async (_, thunkApi) => {
    try {
      const response = await colorService.getColors();
      return response.colors;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get color by id
export const getColorById = createAsyncThunk(
  "color/getColorById",
  async (id, thunkApi) => {
    try {
      const response = await colorService.getColorById(id);
      return response.color;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// update color
export const updateColor = createAsyncThunk(
  "color/updateColor",
  async ({ id, name }, thunkApi) => {
    try {
      const response = await colorService.updateColor(id, name);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// delete color

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (id, thunkApi) => {
    try {
      const response = await colorService.deleteColor(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const colorSlice = createSlice({
  name: "color",
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
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getColorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.color = action.payload;
      })
      .addCase(getColorById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = colorSlice.actions;
export const selectIsLoading = (state) => state.color.isLoading;
export const selectIsSuccess = (state) => state.color.isSuccess;
export const selectIsError = (state) => state.color.isError;
export default colorSlice.reducer;
