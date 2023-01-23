import { createSlice } from "@reduxjs/toolkit";
import { visualizeCollaboratorsInitialState } from "../constants";

export const visualizeCollaboratorsSlice = createSlice({
  name: "visualizeCollaboratorsReducer",
  initialState: visualizeCollaboratorsInitialState,
  reducers: {
    saveAllCollaborators: (state, action) => {
      state.collaborators = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { saveAllCollaborators, setIsLoading } =
  visualizeCollaboratorsSlice.actions;
export const visualizeCollaboratorsReducer =
  visualizeCollaboratorsSlice.reducer;
