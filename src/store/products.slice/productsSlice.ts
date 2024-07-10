import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { productsData } from "../../data";

interface Product {
  id: string;
  image: string;
  title: string;
  weight: string;
  ingredients: string;
  price: string;
  category: string;
  isIcon: boolean;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    initializeProducts: (state) => {
      state.products = [...productsData];
    },
  },
});

export const { addProduct, initializeProducts } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
