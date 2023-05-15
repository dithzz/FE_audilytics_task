import { ActionTypes } from "../constants/actionTypes";

const initialState = {};

const authReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.USER_AUTHENTICATE:
      return { ...state, authUserData: { ...payload } };
    case ActionTypes.LOGOUT:
      return { state: undefined };
    default:
      return state;
  }
};

export default authReducer;
