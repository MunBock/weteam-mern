import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Board from "./components/Board/Board";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Loader from "./components/Loader/Loader";

import "./app.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <ToastContainer />
        <Route path="/" component={Home} exact />
        <Route path="/loader" component={Loader} />
        <Route path="/board/:id" component={Board} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </>
    </Router>
  );
}

export default App;
