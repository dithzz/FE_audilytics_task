import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";
import { toast } from "react-toastify";

export const getAllUsers = (authUserData) => async (dispatch) => {
  try {
    const headers = {
      Authorization: "bearer" + " " + authUserData?.tokens?.access?.token,
    };

    const response = await axios.get(`http://localhost:8000/v1/users`, {
      headers,
    });

    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      payload: response.data,
    });

    console.log(response);
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
};

export const getUserProfile = (authUserData, id) => async (dispatch) => {
  try {
    const headers = {
      Authorization: "bearer" + " " + authUserData?.tokens?.access?.token,
    };

    const response = await axios.get(`http://localhost:8000/v1/users/${id}`, {
      headers,
    });

    dispatch({
      type: ActionTypes.GET_USER_PROFILE,
      payload: response.data,
    });

    console.log(response);
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
};

export const updateUser =
  (authUserData, id, isApproved) => async (dispatch) => {
    try {
      const headers = {
        Authorization: "bearer" + " " + authUserData?.tokens?.access?.token,
      };

      const response = await axios.patch(
        `http://localhost:8000/v1/users/profile/${id}`,
        { isApproved },
        {
          headers,
        }
      );

      toast.success("Profile Updated!");
      dispatch({
        type: ActionTypes.GET_USER_PROFILE,
        payload: response.data,
      });

      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      return null;
    }
  };
