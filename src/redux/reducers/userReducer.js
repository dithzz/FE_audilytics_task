import { ActionTypes } from "../constants/actionTypes";

const initialState = {};

const userReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.GET_ALL_USERS:
      return { ...state, allUsers: { ...payload } };
    case ActionTypes.GET_USER_PROFILE:
      return { ...state, userProfile: { ...payload } };
    default:
      return state;
  }
};

export default userReducer;
