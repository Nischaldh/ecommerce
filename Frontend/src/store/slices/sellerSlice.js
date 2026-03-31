import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "sellers",
  initialState: {
    sellers: [],
    total: 0,
    loading: false,
    selectedSeller: null,
    sellerProducts: [],
    sellerProductsTotal: 0,
    sellerProductsLoading: false,
    filters: { name: "", page: 1, pageSize: 12 },
    productFilters: {
      name: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      minRating: "",
      page: 1,
      pageSize: 10,
    },
  },
  reducers: {
    setSellers: (state, action) => {
      state.sellers = action.payload.sellers;
      state.total = action.payload.total;
    },
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload.products;
      state.sellerProductsTotal = action.payload.total;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSellerProductsLoading: (state, action) => {
      state.sellerProductsLoading = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setProductFilters: (state, action) => {
      state.productFilters = { ...state.productFilters, ...action.payload, page: 1 };
    },
    setProductPage: (state, action) => {
      state.productFilters.page = action.payload;
    },
    resetProductFilters: (state) => {
      state.productFilters = {
        name: "", minPrice: "", maxPrice: "",
        sort: "", minRating: "", page: 1, pageSize: 10,
      };
    },
  },
});

export const {
  setSellers, setSelectedSeller, setSellerProducts,
  setLoading, setSellerProductsLoading,
  setFilters, setPage, setProductFilters, setProductPage, resetProductFilters,
} = sellerSlice.actions;

export default sellerSlice.reducer;