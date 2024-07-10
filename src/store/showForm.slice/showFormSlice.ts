import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowFormState {
  showModal: boolean;
  productId: string | null;
}

const initialState: ShowFormState = {
  showModal: false,
  productId: null,
};

const showFormSlice = createSlice({
  name: "showForm",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.showModal = true;
      state.productId = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.productId = null;
    },
  },
});

export const { openModal, closeModal } = showFormSlice.actions;
export default showFormSlice.reducer;
