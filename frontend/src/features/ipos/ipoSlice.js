import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ipoService from './ipoService';

const initialState = {
  ipos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all IPOs (admin or public)
export const getIPOs = createAsyncThunk('ipos/getAll', async (status = '', thunkAPI) => {
  try {
    // Check if user is logged in (admin view) to pass token
    const token = thunkAPI.getState().auth.user?.token;
    return await ipoService.getIPOs(status, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an IPO (admin only)
export const createIPO = createAsyncThunk('ipos/create', async (ipoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await ipoService.createIPO(ipoData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete an IPO (admin only)
export const deleteIPO = createAsyncThunk('ipos/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await ipoService.deleteIPO(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update an IPO (admin only)
export const updateIPO = createAsyncThunk('ipos/update', async ({ id, ipoData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await ipoService.updateIPO(id, ipoData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const ipoSlice = createSlice({
  name: 'ipos',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIPOs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIPOs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ipos = action.payload;
      })
      .addCase(getIPOs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createIPO.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIPO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ipos.push(action.payload);
      })
      .addCase(createIPO.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIPO.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIPO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ipos = state.ipos.filter(
          (ipo) => ipo._id !== action.meta.arg
        );
      })
      .addCase(deleteIPO.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateIPO.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIPO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ipos = state.ipos.map(ipo => 
          ipo._id === action.payload._id ? action.payload : ipo
        );
      })
      .addCase(updateIPO.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ipoSlice.actions;
export default ipoSlice.reducer;