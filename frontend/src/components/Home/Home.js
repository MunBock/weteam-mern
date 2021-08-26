import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <img
        className="home-image"
        alt=""
        src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      />
      <div className="home-container">
        {userInfo ? (
          <div className="home-title">Welcome, {userInfo.name}</div>
        ) : (
          <>
            <div className="home-title">Welcome to weteam!</div>
            <Link className="home-button" to="/login">
              Get started
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
