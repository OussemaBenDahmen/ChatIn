import {
  GetAllGroupesAction,
  CreateGroupesAction,
  DeleteGroupesAction,
  EditGroupesAction,
} from "../Actions/GroupeActions";

const Axios = require("axios");
const { ServerURI } = require("./Config");

export const GetAllGroupes = () => {
  return (dispatch) =>
    Axios.get(ServerURI + "/Groupes/GetAll", {
      withCredentials: true,
    }).then((res) => dispatch(GetAllGroupesAction(res.data)));
};
export const CreateGroupe = (Groupe) => {
  return (dispatch) => {
    Axios.post(ServerURI + "/Groupes/Create", Groupe, {
      withCredentials: true,
    }).then((res) => dispatch(CreateGroupesAction(res.data)));
  };
};

export const EditGroupe = (Groupe) => {
  return (dispatch) =>
    Axios.put(
      ServerURI + `/Groupes/Edit/${Groupe.GroupeId}`,
      {
        GroupeName: Groupe.GroupeName,
        Users: Groupe.CheckedUsers,
      },
      { withCredentials: true }
    ).then((res) => dispatch(EditGroupesAction(res.data)));
};

export const DeleteGroupe = (GroupeId) => {
  return (dispatch) => {
    Axios.delete(ServerURI + `/Groupes/delete/${GroupeId}`, {
      withCredentials: true,
    }).then((res) => dispatch(DeleteGroupesAction(res.data)));
  };
};
