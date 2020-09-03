import { combineReducers } from "redux";

import { GetUserReducer, GetAllUsersReducer } from "./UserReducer";
import { GetAllGroupesReducer } from "./GroupeReducer";

const AllReducers = combineReducers({
  User: GetUserReducer,
  AllUsers: GetAllUsersReducer,
  AllGroupes: GetAllGroupesReducer,
});

export default AllReducers;
