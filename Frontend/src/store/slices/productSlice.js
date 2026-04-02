import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],          
    total: 0,          
    loading: false,
    selectedProduct: null, 
    filters: {
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: 1,
      pageSize: 10,
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.products;
      state.total = action.payload.total;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
      state.total += 1;
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      state.total -= 1;
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilters: (state, action) => {
      
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        name: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        sort: "",
        page: 1,
        pageSize: 10,
      };
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProduct,
  removeProduct,
  setLoading,
  setFilters,
  setPage,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;