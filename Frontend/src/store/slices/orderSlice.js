import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    total: 0,
    selectedOrder: null,
    loading: false,
    // seller
    sellerItems: [],
    sellerTotal: 0,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.total += 1;
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
      if (state.selectedOrder?.id === action.payload.id) {
        state.selectedOrder.status = action.payload.status;
      }
    },
    setSellerItems: (state, action) => {
      state.sellerItems = action.payload.items;
      state.sellerTotal = action.payload.total;
    },
    updateSellerItemStatus: (state, action) => {
      const item = state.sellerItems.find((i) => i.id === action.payload.id);
      if (item) item.status = action.payload.status;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setOrders,
  setSelectedOrder,
  addOrder,
  updateOrderStatus,
  setSellerItems,
  updateSellerItemStatus,
  setLoading,
} = orderSlice.actions;
export default orderSlice.reducer;