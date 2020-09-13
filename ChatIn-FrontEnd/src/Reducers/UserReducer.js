import { GET_USER, GET_USERS, EDIT_USER } from "../Actions/types";

export const GetUserReducer = (state = {}, action) => {
  if (action.type === GET_USER) {
    return action.payload;
  }
  return state;
};

export const GetAllUsersReducer = (state = [], action) => {
  if (action.type === GET_USERS) {
    return action.payload;
  } else if (action.type === EDIT_USER) {
    return [
      ...state.filter((el) => el._id !== action.payload._id),
      action.payload,
    ];
  }
  return state;
};
