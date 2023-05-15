import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [dob, setDob] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/auth/register",
        userData
      );
      toast.success("Successfully Registered!");
      props.setCurrentForm("login");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
      dob: dob,
      mobile: phoneNo,
      address: [
        {
          line1: address1,
          line2: address2,
          line3: address3,
          pincode: postalCode,
        },
      ],
    };
    createUser(userData);
  };

  return (
    <div className="content">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstName}
            name="firstName"
            onChange={(e) => {
              const regex = /^[A-Za-z]+$/;
              if (regex.test(e.target.value) || e.target.value === "") {
                setFirstName(e.target.value);
              }
            }}
            id="firstName"
          />
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            name="lastName"
            onChange={(e) => {
              const regex = /^[A-Za-z]+$/;
              if (regex.test(e.target.value) || e.target.value === "") {
                setLastName(e.target.value);
              }
            }}
            id="lastName"
          />

          <label htmlFor="dob">DOB</label>
          <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            id="dob"
            name="dob"
            type="date"
          />
          <label htmlFor="address1">Address 1</label>
          <input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            id="address1"
            name="address1"
          />
          <label htmlFor="address2">Address 2</label>
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            id="address2"
            name="address2"
          />
          <label htmlFor="address2">Address 3</label>
          <input
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
            id="address3"
            name="address3"
          />
          <label htmlFor="postalCode">Postal Code</label>
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            id="postalCode"
            name="paspostalCodesword"
            type="number"
          />
          <label htmlFor="phno">Phone Number</label>
          <input
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            id="phoneNo"
            name="phoneNo"
          />
          <label htmlFor="email">Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
          />

          <button
            disabled={!firstName || !lastName || !email || !pass}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.setCurrentForm("login")}
        >
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};
