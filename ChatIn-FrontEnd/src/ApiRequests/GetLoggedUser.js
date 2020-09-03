const { default: Axios } = require("axios");
const { ServerURI } = require("./Config");
const { GetUserAction } = require("../Actions/UsersAction");

export const GetLoggedUser = () => {
  return (dispatch) =>
    Axios.get(ServerURI + "/users/GetLogged", {
      withCredentials: true,
    }).then((res) => {
      console.log("efze");
      dispatch(GetUserAction(res.data));
    });
};
