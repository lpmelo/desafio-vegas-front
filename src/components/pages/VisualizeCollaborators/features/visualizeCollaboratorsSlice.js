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
    openEditModal: (state, action) => {
      state.editModal.open = action.payload;
    },
    saveCollaboratorData: (state, action) => {
      state.editModal.collaborator.data = action.payload;
      state.editModal.collaborator.autoComplete.value =
        state.editModal.collaborator.data.occupation;
    },
    changeCollaboratorData: (state, action) => {
      state.editModal.collaborator.data[action.payload.field] =
        action.payload.changedValue;
    },
    changeCollaboratorMessages: (state, action) => {
      state.editModal.collaborator.messages = action.payload;
    },
    clearCollaboratorMessages: (state) => {
      state.editModal.collaborator.messages = {};
    },
    clearCollaboratorData: (state) => {
      state.editModal.collaborator.data = {};
    },
    saveCepGetResponse: (state, action) => {
      state.editModal.collaborator.data.uf = action.payload.uf;
      state.editModal.collaborator.data.city = action.payload.localidade;
      state.editModal.collaborator.data.district = action.payload.bairro;
      state.editModal.collaborator.data.address = action.payload.logradouro;
      state.editModal.collaborator.data.complement = action.payload.complemento;
    },
    clearAutoCompleteAction: (state) => {
      state.editModal.collaborator.autoComplete =
        visualizeCollaboratorsInitialState.editModal.collaborator.autoComplete;
      state.editModal.collaborator.data.occupation = "";
    },
    searchAutoCompleteAction: (state, action) => {
      state.editModal.collaborator.autoComplete = {
        ...state.editModal.collaborator.autoComplete,
        loading: true,
        value: action.payload,
      };
    },
    finishSearchAutoCompleteAction: (state, action) => {
      state.editModal.collaborator.autoComplete = {
        ...state.editModal.collaborator.autoComplete,
        loading: false,
        results: action.payload,
      };
    },
    updateSelectAutoCompleteAction: (state, action) => {
      state.editModal.collaborator.autoComplete = {
        ...state.editModal.collaborator.autoComplete,
        value: action.payload,
      };
      state.editModal.collaborator.data.occupation =
        state.editModal.collaborator.autoComplete.value;
      delete state.editModal.collaborator.messages.occupation;
    },
    setBtnLocked: (state, action) => {
      state.editModal.collaborator.btnLocked = action.payload;
    },
    setBtnNotActiveActions: (state, action) => {
      state.btnNotActive = action.payload;
    },
  },
});

export const {
  saveAllCollaborators,
  setIsLoading,
  openEditModal,
  saveCollaboratorData,
  clearCollaboratorData,
  changeCollaboratorData,
  changeCollaboratorMessages,
  clearCollaboratorMessages,
  saveCepGetResponse,
  clearAutoCompleteAction,
  finishSearchAutoCompleteAction,
  searchAutoCompleteAction,
  updateSelectAutoCompleteAction,
  setBtnLocked,
  setBtnNotActiveActions,
} = visualizeCollaboratorsSlice.actions;
export const visualizeCollaboratorsReducer =
  visualizeCollaboratorsSlice.reducer;
