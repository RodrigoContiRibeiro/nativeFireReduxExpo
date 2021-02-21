import { USER_STATE_CHANGE } from "../actionsTypes.js";

const initialState = {
  currentUser: "",
};


export const userReducer = (state = initialState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
