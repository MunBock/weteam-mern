import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "../../actions/user";

import "./register.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (passwordNotMatch) {
      toast.error(`${passwordNotMatch}`);
    } else if (error) {
      toast.error(`${error}`);
    }
  }, [passwordNotMatch, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordNotMatch("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="register-place">
        <div className="register-container">
          <div className="register-title">Register</div>
          <form onSubmit={submitHandler}>
            <div className="register-input-container">
              <label className="register-label">Name</label>
              <input
                type="name"
                value={name}
                autoComplete="off"
                className="register-name-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="register-input-container">
              <label className="register-label">Email</label>
              <input
                type="email"
                value={email}
                autoComplete="off"
                className="register-email-input"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="register-input-container">
              <label className="register-label">Password</label>
              <input
                type="password"
                value={password}
                className="register-password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="register-input-container">
              <label className="register-label">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                className="register-confirm-password-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="register-button">
              Register
            </button>
          </form>

          <div>
            Already registered?
            <Link to="/login" className="registered-user-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
