import { configureStore } from "@reduxjs/toolkit";
import { homePageReducer } from "../components/pages/HomePage/features/HomePageSlice";
import { registerCollaboratorReducer } from "../components/pages/RegisterCollaborator/features/registerCollaboratorSlice";
import { visualizeCollaboratorsReducer } from "../components/pages/VisualizeCollaborators/features/visualizeCollaboratorsSlice";
import { pageSwitcherReducer } from "../features/pageSwitcher/pageSwitcherSlice";

export const store = configureStore({
  reducer: {
    pageSwitcher: pageSwitcherReducer,
    homePage: homePageReducer,
    registerCollaborator: registerCollaboratorReducer,
    visualizeCollaborators: visualizeCollaboratorsReducer,
  },
});
