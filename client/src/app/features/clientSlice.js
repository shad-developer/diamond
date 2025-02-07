import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clientService from "../services/clientService";
import { toast } from "react-toastify";

const initialState = {
  clients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add clients
export const addClient = createAsyncThunk(
  "client/addClient",
  async (formData, thunkApi) => {
    try {
      const response = await clientService.addClient(formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get all clients
export const getClients = createAsyncThunk(
  "client/getAllClients",
  async (_, thunkApi) => {
    try {
      const response = await clientService.getClients();
      return response.clients;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// get client by id
export const getClientById = createAsyncThunk(
  "client/getClientById",
  async (id, thunkApi) => {
    try {
      const response = await clientService.getClientById(id);
      return response.client;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// delete client

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id, thunkApi) => {
    try {
      const response = await clientService.deleteClient(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);


// update client
export const updateClient = createAsyncThunk(
  "client/updateClient",
  async ({id, formData}, thunkApi) => {
    try {
      const response = await clientService.updateClient(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
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
      .addCase(addClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.client = action.payload;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET } = clientSlice.actions;
export const selectIsLoading = (state) => state.client.isLoading;
export const selectIsSuccess = (state) => state.client.isSuccess;
export const selectIsError = (state) => state.client.isError;
export default clientSlice.reducer;
