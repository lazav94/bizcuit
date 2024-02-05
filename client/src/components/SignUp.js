import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { host } from "../utils/environment";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    // TODO add email and password validation
    setProfile((prev) => ({ ...prev, [target.name]: target.value }));
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const signup = async () => {
      try {
        await axios.post(`${host}/user/signup`, profile);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.response.data.message || error.message);
      }
    };

    signup();
    // Reset the form after submission
    setProfile({ name: "", email: "", password: "" });
  };

  return (
    <section className="login-form-container">
      <ErrorMessage message={errorMessage} />

      <h2>Sign up Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={profile.name}
          onChange={handleChange}
          name="name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={profile.email}
          onChange={handleChange}
          name="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={profile.password}
          onChange={handleChange}
          name="password"
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
};

export default Signup;
