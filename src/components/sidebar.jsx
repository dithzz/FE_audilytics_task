import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const authUserData = useSelector((state) => state.auth?.authUserData?.data);
  return (
    <div
      style={{
        width: "5%",
        background: "rgb(25, 116, 235)",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div className="menuItem">
        <Link to="/profile">Profile</Link>
      </div>{" "}
      {authUserData?.user?.role === "admin" && (
        <div className="menuItem">
          <Link to="/users">Users</Link>
        </div>
      )}
    </div>
  );
}
