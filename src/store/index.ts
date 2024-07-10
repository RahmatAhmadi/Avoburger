import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./showForm.slice/showFormSlice";
import productsReducer from "./products.slice/productsSlice";
import productDetailModalReducer from "./productDetailsModal.slice/productDetailsModalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    products: productsReducer,
    productDetailModal: productDetailModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
