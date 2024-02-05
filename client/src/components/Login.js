import React, { useState } from "react";
import axios from "axios";
import { host } from "../utils/environment";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    // TODO add email and password validation
    setCredentials((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const login = async () => {
      try {
        const { data } = await axios.post(`${host}/user/login`, credentials);
        localStorage.setItem("access_token", data);
        navigate("/todos");
      } catch (error) {
        setErrorMessage(error.response.data.message || error.message);
      }
    };
    login();
    // Reset the form after submission
    setCredentials({ email: "", password: "" });
  };

  return (
    <>
      <h1>TODO APP</h1>
      <section className="login-form-container">
        <ErrorMessage message={errorMessage} />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            name="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            name="password"
            required
          />
          <Link className="sign-up-link" to="/signup">
            or create account
          </Link>
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
