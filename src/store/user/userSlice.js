import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../axios";
import { apiUpdatePassword, apiGetOrderByAccount } from "../../apis";


export const setOrders = createAction('user/setOrders');

export const updatePasswordThunk = createAsyncThunk(
  'user/updatePassword',
  async ({ accountId, currentPassword, newPassword, confirmNewPassword }, thunkAPI) => {
    try {
      const response = await apiUpdatePassword(accountId, { currentPassword, newPassword, confirmNewPassword });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

export const fetchOrdersThunk = createAsyncThunk(
  'user/fetchOrders',
  async (accountId, thunkAPI) => {
    try {
      const response = await apiGetOrderByAccount(accountId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    email: "",
    userId: "",
    tokens: {
      accessToken: "",
      refreshToken: "",
    },
    message: "",
    cart: [],
    totalItems: 0,
    totalPrice: 0,
    cartId: "",
    orders: [], 
  },
  reducers: {
    login: (state, action) => {
      setAuthToken(action.payload.tokens.accessToken);
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.tokens = action.payload.tokens;
    },
    logout: (state) => {
      setAuthToken(null);
      state.isLoggedIn = false;
      state.email = "";
      state.tokens.accessToken = "";
      state.userId = "";
      state.tokens.refreshToken = "";
    },
    updateCart: (state, action) => {
      state.cart = action.payload.cartDetails;
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.quantity * (item.product?.price ?? 0),
        0
      );
      state.cartId = action.payload.cartId || state.cartId;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload.cartId;
    },
    clearCartId: (state) => {
      state.cartId = "";
      state.cart = [];
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        state.message = "Password updated successfully.";
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.message = action.payload || "Failed to update password.";
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload; 
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        console.error("Error fetching orders:", action.payload);
      });
  },
});

export const { login, logout, updateCart, setCartId, clearCartId } = userSlice.actions;

export default userSlice.reducer;
