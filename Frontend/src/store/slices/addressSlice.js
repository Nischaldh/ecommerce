import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    total: 0,
    loading: false,
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload.addresses;
      state.total = action.payload.total;
    },
    addAddress: (state, action) => {
      // if new address is default, unset others
      if (action.payload.isDefault) {
        state.addresses = state.addresses.map((a) => ({
          ...a,
          isDefault: false,
        }));
      }
      state.addresses.unshift(action.payload);
      state.total += 1;
    },
    updateAddress: (state, action) => {
      if (action.payload.isDefault) {
        state.addresses = state.addresses.map((a) => ({
          ...a,
          isDefault: false,
        }));
      }
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) state.addresses[index] = action.payload;
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      state.total -= 1;
    },
    setDefaultAddress: (state, action) => {
      state.addresses = state.addresses.map((a) => ({
        ...a,
        isDefault: a.id === action.payload,
      }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  setLoading,
} = addressSlice.actions;
export default addressSlice.reducer;