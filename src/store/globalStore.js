import { configureStore } from "@reduxjs/toolkit";
import { registerCollaboratorReducer } from "../components/pages/RegisterCollaborator/features/registerCollaboratorSlice";
import { visualizeDeliveriesReducer } from "../components/pages/VisualizeDeliveries/features/visualizeDeliveriesSlice";
import { pageSwitcherReducer } from "../features/pageSwitcher/pageSwitcherSlice";

export const store = configureStore({
  reducer: {
    pageSwitcher: pageSwitcherReducer,
    registerCollaborator: registerCollaboratorReducer,
    visualizeDeliveries: visualizeDeliveriesReducer,
  },
});
