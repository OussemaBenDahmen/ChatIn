const { default: Axios } = require("axios");
const { ServerURI } = require("./types");

export const LoginApiRequest = (Coords) => {
  console.log(Coords);
  Axios.post(ServerURI + "/ChatIn/Login", Coords, { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      if (res.data.name === "Oussema") {
        window.location.assign("/IndvidualChat");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
