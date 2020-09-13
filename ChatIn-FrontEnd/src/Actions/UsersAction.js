const { GET_USER, GET_USERS, EDIT_USER } = require("./types");

export const GetUserAction = (payload) => ({
  type: GET_USER,
  payload,
});

export const GetAllUsersAction = (payload) => ({
  type: GET_USERS,
  payload,
});

export const EditUserAction = (payload) => ({
  type: EDIT_USER,
  payload,
});
