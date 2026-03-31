import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import orderReducer from "./slices/orderSlice.js";
import reviewReducer from "./slices/reviewSlice.js";
import addressReducer from "./slices/addressSlice.js";
import sellerReducer from "./slices/sellerSlice.js";


export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    addresses: addressReducer,
    sellers: sellerReducer,
  },
});
