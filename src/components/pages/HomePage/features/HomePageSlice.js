import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repositoryModal: { open: false, type: 0 },
};

export const HomePageSlice = createSlice({
  name: "homePageReducer",
  initialState,
  reducers: {
    controlModal: (state, action) => {
      state.repositoryModal.open = action.payload;
    },
    changeModalType: (state, action) => {
      state.repositoryModal.type = action.payload;
    },
  },
});

export const { controlModal, changeModalType } = HomePageSlice.actions;
export const homePageReducer = HomePageSlice.reducer;
