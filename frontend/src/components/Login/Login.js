import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../../actions/user";

import "./login.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading && <Loader />}
      <div className="login-place">
        <div className="login-container">
          <div className="login-title">Login</div>
          <form onSubmit={submitHandler}>
            <div className="login-input-container">
              <label className="login-label">Email</label>
              <input
                type="email"
                value={email}
                required
                className="login-email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-container">
              <label className="login-label">Password</label>
              <input
                type="password"
                value={password}
                required
                className="login-email-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div>
            New user?
            <Link to="/register" className="new-user-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
