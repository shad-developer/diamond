import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualityService";
import { toast } from "react-toastify";

const initialState = {
  qualities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add quality
export const addQuality = createAsyncThunk(
  "quality/addQuality",
  async (name, thunkApi) => {
    try {
      const response = await qualityService.addQuality(name);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all qualities
export const getQualities = createAsyncThunk(
  "quality/getQualities",
  async (_, thunkApi) => {
    try {
      const response = await qualityService.getQualities();
      return response.qualities;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get quality by id
export const getQualityById = createAsyncThunk(
  "quality/getQualityById",
  async (id, thunkApi) => {
    try {
      const response = await qualityService.getQualityById(id);
      return response.quality;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// update quality
export const updateQuality = createAsyncThunk(
    "quality/updateQuality",
    async ({id, name}, thunkApi) => {
      try {
        const response = await qualityService.updateQuality(id, name);
        toast.success(response.message);
        return response;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );

// delete quality

export const deleteQuality = createAsyncThunk(
  "quality/deleteQuality",
  async (id, thunkApi) => {
    try {
      const response = await qualityService.deleteQuality(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);




const qualitySlice = createSlice({
  name: "quality",
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
      .addCase(addQuality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addQuality.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addQuality.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQualities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQualities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.qualities = action.payload;
      })
      .addCase(getQualities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQualityById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQualityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.quality = action.payload;
      })
      .addCase(getQualityById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuality.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateQuality.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuality.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteQuality.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = qualitySlice.actions;
export const selectIsLoading = (state) => state.quality.isLoading;
export const selectIsSuccess = (state) => state.quality.isSuccess;
export const selectIsError = (state) => state.quality.isError;
export default qualitySlice.reducer;
