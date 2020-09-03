import Axios from "axios";
import { ServerURI } from "./Config";
import { GetUserAction } from "../Actions/UsersAction";

export function LoginApiRequest(Coords) {
  return (dispatch) => {
    Axios.post(ServerURI + "/ChatIn/Login", Coords, { withCredentials: true })
      .then((res) => {
        dispatch(GetUserAction(res.data));
        window.location.assign("/IndvidualChat");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
