import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import Header from "./components/header";
import { Users } from "./Users";
import { SingleUser } from "./singleUser";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  // const [isAuth, setIsAuth] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              currentForm === "login" ? (
                <Login setCurrentForm={setCurrentForm} />
              ) : (
                <Register setCurrentForm={setCurrentForm} />
              )
            }
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/users/:id" element={<SingleUser />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
