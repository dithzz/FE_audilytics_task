import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userAuthenticate } from "./redux/actions/authActions";

export const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserData = useSelector((state) => state.auth?.authUserData?.data);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const isAuth = localStorage.getItem("token");

  // useEffect(() => {
  //   if (authUserData?.tokens?.access?.token) {
  //     navigate("/profile");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userAuthenticate(email, pass, navigate));
  };

  return (
    <div className="content">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Username/Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <button disabled={!email || !pass} type="submit">
            Log In
          </button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.setCurrentForm("register")}
        >
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};
