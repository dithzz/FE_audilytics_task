import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@material-ui/core";
import Sidebar from "./components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import axios from "axios";
import { ActionTypes } from "./redux/constants/actionTypes";
import { toast } from "react-toastify";
import { getUserProfile, updateUser } from "./redux/actions/userActions";

export const SingleUser = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authUserData = useSelector((state) => state.auth?.authUserData?.data);
  const userData = useSelector((state) => state.auth?.authUserData);
  const userProfileData = useSelector((state) => state.users?.userProfile);

  console.log(userProfileData, "userProfileData");
  const userDetails = useSelector(
    (state) => state.auth?.authUserData?.data?.user
  );
  console.log(userData);

  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!authUserData?.tokens?.access?.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserProfile(authUserData, id));
  }, []);

  useEffect(() => {
    if (userProfileData) {
      setFormData(userProfileData);
    }
  }, [userProfileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: "bearer" + " " + authUserData?.tokens?.access?.token,
      };

      const { email, dob, mobile } = formData;

      const { line1, line2, line3, pincode } = formData.address[0];

      const response = await axios.patch(
        `http://localhost:8000/v1/users/${userDetails?.id}`,

        { email, dob, mobile, address: [{ line1, line2, line3, pincode }] },
        { headers }
      );

      dispatch({
        type: ActionTypes.USER_AUTHENTICATE,
        payload: {
          ...userData,
          data: {
            ...userData?.data,
            user: response.data,
          },
        },
      });
      toast.success("Updated Successfully!");
      return setFormData(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      return null;
    }
  };

  useEffect(() => {
    if (!authUserData?.tokens?.access?.token) {
      navigate("/");
    }
  }, []);

  console.log(formData, "formData");

  return (
    <div className="backgroundContent">
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="backgroundContent">
          {" "}
          <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
              <div style={{ margin: "10px 0" }}>
                Current Time: {moment().format("HH:mm A")}
              </div>{" "}
              <label>
                Validate User &nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  checked={formData?.isApproved}
                  onChange={(e) =>
                    dispatch(updateUser(authUserData, id, e.target.checked))
                  }
                ></input>
              </label>
              <label htmlFor="name">First Name</label>
              <input
                value={formData?.firstName}
                name="firstName"
                disabled={true}
                onChange={(e) => {
                  const regex = /^[A-Za-z]+$/;
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setFormData({ ...formData, firstName: e.target.value });
                  }
                }}
                id="firstName"
              />
              <label htmlFor="name">Last Name</label>
              <input
                value={formData?.lastName}
                name="lastName"
                disabled={true}
                onChange={(e) => {
                  const regex = /^[A-Za-z]+$/;
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setFormData({ ...formData, lastName: e.target.value });
                  }
                }}
                id="lastName"
              />
              <label htmlFor="dob">DOB</label>
              <input
                value={moment(formData?.dob || "").format("YYYY-MM-DD")}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                id="dob"
                disabled={!edit}
                name="dob"
                type="date"
              />
              <label htmlFor="address1">Line 1</label>
              <input
                value={"******************************"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: [
                      { ...formData.address[0], line1: e.target.value },
                    ],
                  })
                }
                id="address1"
                disabled={!edit}
                name="address1"
              />
              <label htmlFor="address2">Line 2</label>
              <input
                value={"******************************"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: [
                      { ...formData.address[0], line2: e.target.value },
                    ],
                  })
                }
                id="address2"
                disabled={!edit}
                name="address2"
              />{" "}
              <label htmlFor="address3">Line 3</label>
              <input
                value={formData?.address[0]?.line3}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: [
                      { ...formData.address[0], line3: e.target.value },
                    ],
                  })
                }
                id="address3"
                name="address3"
                disabled={!edit}
              />
              <label htmlFor="postalCode">Postal Code</label>
              <input
                value={formData?.address[0]?.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: [
                      {
                        ...formData.address[0],
                        pincode: e.target.value,
                      },
                    ],
                  })
                }
                id="postalCode"
                name="paspostalCodesword"
                type="number"
                disabled={!edit}
              />
              <label htmlFor="phno">Phone Number</label>
              <input
                value={formData?.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                id="phoneNo"
                name="phoneNo"
                disabled={!edit}
              />
              <label htmlFor="email">Username</label>
              <input
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                id="email"
                disabled={!edit}
                name="email"
              />
              <label htmlFor="email">Password</label>
              <input
                type="password"
                value={"*************"}
                id="email"
                disabled={!edit}
                name="email"
              />
            </form>
          </div>
        </div>{" "}
        <div>
          {formData?.isApproved ? (
            <Box
              style={{ textAlign: "center" }}
              className="auth-form-container"
            >
              <Box>
                <CheckBoxIcon className="tick" />
              </Box>
              <Box>User Validated</Box>
            </Box>
          ) : (
            <Box
              style={{ textAlign: "center" }}
              className="auth-form-container"
            >
              <Box>
                <CloseIcon className="close" />
              </Box>
              <Box>User not Validated</Box>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};
