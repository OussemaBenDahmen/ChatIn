const { GET_USER, GET_USERS } = require("./types");

export const GetUserAction = (payload) => ({
  type: GET_USER,
  payload,
});

export const GetAllUsersAction = (payload) => ({
  type: GET_USERS,
  payload,
});
