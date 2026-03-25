import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    items: [],
    loading: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.id = action.payload.id;
      state.items = action.payload.items || [];
    },
    addItem: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        exists.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.id = null;
      state.items = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  setLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
