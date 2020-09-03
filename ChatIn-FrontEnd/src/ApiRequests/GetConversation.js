const Axios = require("axios");
const { ServerURI } = require("./Config");
const { GetAllUsersAction } = require("../Actions/UsersAction");

export const GetAllUsers = () => {
  return (dispatch) =>
    Axios.get(ServerURI + "/users/getAll", {
      withCredentials: true,
    }).then((res) => {
      dispatch(GetAllUsersAction(res.data));
    });
};
