import Axios from "axios";
import { ServerURI } from "./Config";
import { GetUserAction } from "../Actions/UsersAction";

export const SignUpApiRequest = (User) => {
  return (dispatch) =>
    Axios.post(ServerURI + "/ChatIn/SignUp", User, {
      withCredentials: true,
    }).then((res) => {
      dispatch(GetUserAction(res.data));
      window.location.assign("/IndvidualChat");
    });
};
