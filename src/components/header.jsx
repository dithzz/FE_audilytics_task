import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../redux/constants/actionTypes";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUserData = useSelector((state) => state.auth?.authUserData?.data);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (authUserData)
    return (
      <div
        style={{
          width: "100%",
          height: "60px",
          background: "rgb(25, 116, 235)",
          color: "white",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0 70px 0 0", cursor: "pointer" }}>
          <AccountCircleIcon onClick={handleClick} />{" "}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div style={{ padding: "5px 50px" }}>
              <Typography sx={{ p: 1 }}>
                {authUserData?.user?.firstName +
                  " " +
                  authUserData?.user?.lastName}
              </Typography>

              <div
                onClick={() => {
                  dispatch({
                    type: ActionTypes.USER_AUTHENTICATE,
                    payload: null,
                  });
                  navigate("/");
                }}
                className="logout"
              >
                Logout
              </div>
            </div>
          </Popover>
        </div>
      </div>
    );
}
