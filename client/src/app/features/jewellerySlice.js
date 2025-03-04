import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import jewelleryService from "../services/jewelleryService";

const initialState = {
    jewelleryTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add jewelley_rules
export const addJewelleryRules = createAsyncThunk(
  "jewelley_rules/addJewelleryRules",
  async (formData, thunkApi) => {
    try {
      const response = await jewelleryService.addJewelleryRules(formData);
      toast.success(response?.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all jewelley_rules
export const getJewelleryRules = createAsyncThunk(
  "jewelley_rules/getJewelleryRules",
  async (_, thunkApi) => {
    try {
      const response = await jewelleryService.getJewelleryRules();
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addJewelleryTypes = createAsyncThunk(
  "jewelley_rules/addJewelleryTypes",
  async (formData, thunkApi) => {
    try {
      const response = await jewelleryService.addJewelleryTypes(formData);
      toast.success(response?.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all jewelley_rules
export const getJewelleryTypes = createAsyncThunk(
  "jewelley_rules/getJewelleryTypes",
  async (_, thunkApi) => {
    try {
      const response = await jewelleryService.getJewelleryTypes();
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// get jewellery type by id

export const getJewelleryTypeById = createAsyncThunk(
  "jewelley_rules/getJewelleryTypeById",
  async (id, thunkApi) => {
    try {
      const response = await jewelleryService.getJewelleryTypeById(id);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// update jewelry type
export const updateJewelleryType = createAsyncThunk(
  "jewelley_rules/updateJewelleryType",
  async ({ id, formData }, thunkApi) => {
    try {
      const response = await jewelleryService.updateJewelleryType(id, formData);
      toast.success(response?.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// delete jewellery type

export const deleteJewelleryType = createAsyncThunk(
  "jewelley_rules/deleteJewelleryType",
  async (id, thunkApi) => {
    try {
      const response = await jewelleryService.deleteJewelleryType(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


const JewellerySlice = createSlice({
  name: "jewellery",
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
      .addCase(addJewelleryRules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJewelleryRules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addJewelleryRules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJewelleryRules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJewelleryRules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.JewellreyRules = action.payload;
      })
      .addCase(getJewelleryRules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addJewelleryTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJewelleryTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addJewelleryTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJewelleryTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJewelleryTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jewelleryTypes = action.payload;
      })
      .addCase(getJewelleryTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJewelleryTypeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJewelleryTypeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jewelleryType = action.payload;
      })
      .addCase(getJewelleryTypeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateJewelleryType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJewelleryType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateJewelleryType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteJewelleryType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJewelleryType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteJewelleryType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = JewellerySlice.actions;
export const selectIsLoading = (state) => state.jewellery.isLoading;
export const selectIsSuccess = (state) => state.jewellery.isSuccess;
export const selectIsError = (state) => state.jewellery.isError;
export default JewellerySlice.reducer;
