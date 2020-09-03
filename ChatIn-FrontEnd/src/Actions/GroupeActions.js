import { GET_GROUPES, CREATE_GROUPES, DELETE_GROUPES } from "./types";

export const GetAllGroupesAction = (payload) => ({
  type: GET_GROUPES,
  payload,
});

export const CreateGroupesAction = (payload) => ({
  type: CREATE_GROUPES,
  payload,
});

export const DeleteGroupesAction = (payload) => ({
  type: DELETE_GROUPES,
  payload,
});
