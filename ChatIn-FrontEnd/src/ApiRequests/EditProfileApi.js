import { EditUserAction } from "../Actions/UsersAction";

const Axios = require("axios");
const { ServerURI } = require("./Config");

export const EditProfileApi = (User, img) => {
  const data = new FormData();
  data.append("Picture", img);
  return (dispatch) => {
    Axios.put(ServerURI + `/UploadImage`, data, {
      withCredentials: true,
    }).then((res) => {
      Axios.put(ServerURI + `/Users/Edit/${User._id}`, User.Profile, {
        withCredentials: true,
      }).then((res) => {
        dispatch(EditUserAction(res.data));
        window.location.assign("/IndvidualChat");
      });
    });
  };
};
