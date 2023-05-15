import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";
import { toast } from "react-toastify";

export const userAuthenticate = (email, pass, navigate) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/v1/auth/login", {
      email,
      password: pass,
    });

    dispatch({
      type: ActionTypes.USER_AUTHENTICATE,
      payload: response,
    });

    toast.success("You have successfully logged in!");
    navigate("/profile");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
