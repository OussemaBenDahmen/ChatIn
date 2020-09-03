import { GET_GROUPES, CREATE_GROUPES, DELETE_GROUPES } from "../Actions/types";

export const GetAllGroupesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GROUPES:
      return action.payload;
    case CREATE_GROUPES:
      return [...state, action.payload];
    case DELETE_GROUPES:
      return [...state].filter((el) => el._id !== action.payload._id);
    default:
      return state;
  }
};
