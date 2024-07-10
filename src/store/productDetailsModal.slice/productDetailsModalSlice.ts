import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  image: string;
  title: string;
  weight: string;
  ingredients: string;
  price: string;
}

interface ProductDetailModalState {
  showModal: boolean;
  selectedProduct: Product;
  mode: "view" | "edit";
}

const initialState: ProductDetailModalState = {
  showModal: false,
  selectedProduct: {
    id: "",
    image: "",
    title: "",
    weight: "",
    ingredients: "",
    price: "",
  },
  mode: "view",
};

const productDetailModalSlice = createSlice({
  name: "productDetailModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ product: Product; mode: "view" | "edit" }>
    ) => {
      state.showModal = true;
      state.selectedProduct = action.payload.product;
      state.mode = action.payload.mode;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.selectedProduct = initialState.selectedProduct;
      state.mode = "view";
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      console.log("Reducer update product:", action.payload);

      state.selectedProduct = action.payload;
    },
  },
});

export const { openModal, closeModal, updateProduct } =
  productDetailModalSlice.actions;
export default productDetailModalSlice.reducer;
