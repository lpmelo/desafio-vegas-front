import { createSlice } from "@reduxjs/toolkit";
import { formInitialState } from "../constants";

export const registerCollaboratorSlice = createSlice({
  name: "registerCollaboratorReducer",
  initialState: formInitialState,
  reducers: {
    saveGetResponse: (state, action) => {
      state.formData.uf = action.payload.uf;
      state.formData.city = action.payload.localidade;
      state.formData.district = action.payload.bairro;
      state.formData.address = action.payload.logradouro;
      state.formData.complement = action.payload.complemento;
    },
    changeValue: (state, action) => {
      state.formData[action.payload.field] = action.payload.changedValue;
    },
    clearState: (state, action) => {
      state.formData.clientName = action.payload;
      state.formData.cpf = action.payload;
      state.formData.deliveryDate = action.payload;
      state.formData.occupation = action.payload;
      state.formData.cep = action.payload;
      state.formData.uf = action.payload;
      state.formData.city = action.payload;
      state.formData.district = action.payload;
      state.formData.address = action.payload;
      state.formData.number = action.payload;
      state.formData.complement = action.payload;
    },
    changeMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = {};
    },
    onSubmitFailed: (state) => {
      state.submitEvents.submitSuccess = false;
      state.submitEvents.submitFailed = true;
    },
    onSubmitSuccess: (state) => {
      state.submitEvents.submitFailed = false;
      state.submitEvents.submitSuccess = true;
    },
    clearValidations: (state) => {
      state.haveError = false;
      state.submitEvents.submitFailed = false;
      state.submitEvents.submitSuccess = false;
    },
    clearAutoCompleteAction: (state) => {
      state.autoComplete = formInitialState.autoComplete;
      state.formData.occupation = "";
    },
    searchAutoCompleteAction: (state, action) => {
      state.autoComplete = {
        ...state.autoComplete,
        loading: true,
        value: action.payload,
      };
    },
    finishSearchAutoCompleteAction: (state, action) => {
      state.autoComplete = {
        ...state.autoComplete,
        loading: false,
        results: action.payload,
      };
    },
    updateSelectAutoCompleteAction: (state, action) => {
      state.autoComplete = {
        ...state.autoComplete,
        value: action.payload,
      };
      state.formData.occupation = state.autoComplete.value;
      delete state.messages.occupation;
    },
  },
});

export const {
  changeValue,
  saveGetResponse,
  clearState,
  changeMessages,
  clearMessages,
  onSubmitFailed,
  onSubmitSuccess,
  clearValidations,
  clearAutoCompleteAction,
  searchAutoCompleteAction,
  finishSearchAutoCompleteAction,
  updateSelectAutoCompleteAction,
} = registerCollaboratorSlice.actions;
export const registerCollaboratorReducer = registerCollaboratorSlice.reducer;
