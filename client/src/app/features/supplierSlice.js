import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierService from "../services/supplierService";
import { toast } from "react-toastify";

const initialState = {
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add suppliers
export const addSupplier = createAsyncThunk(
  "supplier/add-supplier",
  async (formData, thunkApi) => {
    try {
      const response = await supplierService.addSupplier(formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all suppliers
export const getSuppliers = createAsyncThunk(
  "supplier/getAllSuppliers",
  async (_, thunkApi) => {
    try {
      const response = await supplierService.getSuppliers();
      return response.suppliers;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get supplier by id
export const getSupplierById = createAsyncThunk(
  "supplier/get-Supplier-By-Id",
  async (id, thunkApi) => {
    try {
      const response = await supplierService.getSupplierById(id);
      return response.supplier;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// update supplier
export const updateSupplier = createAsyncThunk(
  "supplier/update-supplier",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await supplierService.updateSupplier(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// delete supplier
export const deleteSupplier = createAsyncThunk(
  "supplier/delete-supplier",
  async (id, thunkApi) => {
    try {
      const response = await supplierService.deleteSupplier(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
const supplierSlice = createSlice({
  name: "supplier",
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
      .addCase(addSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSupplierById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplierById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.supplier = action.payload;
      })
      .addCase(getSupplierById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = supplierSlice.actions;
export const selectIsLoading = (state) => state.supplier.isLoading;
export const selectIsSuccess = (state) => state.supplier.isSuccess;
export const selectIsError = (state) => state.supplier.isError;
export default supplierSlice.reducer;
