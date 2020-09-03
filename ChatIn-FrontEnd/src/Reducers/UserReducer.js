import { GET_USER, GET_USERS } from "../Actions/types";

export const GetUserReducer = (state = {}, action) => {
  if (action.type === GET_USER) {
    return action.payload;
  }
  return state;
};

export const GetAllUsersReducer = (state = [], action) => {
  if (action.type === GET_USERS) {
    return action.payload;
  }
  return state;
};
