import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lottService from "../services/lottService";
import { toast } from "react-toastify";

const initialState = {
    lots: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add lott
export const addNewLot = createAsyncThunk(
  "lot/addNewLot",
  async (formData, thunkApi) => {
    try {
      const response = await lottService.addNewLot(formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // get all lotts
export const getAllLots = createAsyncThunk(
  "lots/getAllLots",
  async (_, thunkApi) => {
    try {
      const response = await lottService.getAllLots();
      return response.lots;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // get lot by id
export const getLotById = createAsyncThunk(
  "lot/getLotById",
  async (id, thunkApi) => {
    try {
      const response = await lottService.getLotById(id);
      return response.lot;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // delete lott

export const deleteLott = createAsyncThunk(
  "lott/deleteLott",
  async (id, thunkApi) => {
    try {
      const response = await lottService.deleteLott(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // update lot
export const updateLot = createAsyncThunk(
  "lot/updateLot",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await lottService.updateLot(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const lottSlice = createSlice({
  name: "lott",
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
      .addCase(addNewLot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewLot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addNewLot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllLots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.lots = action.payload;
      })
      .addCase(getAllLots.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLotById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLotById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.lot = action.payload;
      })
      .addCase(getLotById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateLot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLott.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLott.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteLott.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = lottSlice.actions;
export const selectIsLoading = (state) => state.lot.isLoading;
export const selectIsSuccess = (state) => state.lot.isSuccess;
export const selectIsError = (state) => state.lot.isError;
export default lottSlice.reducer;
