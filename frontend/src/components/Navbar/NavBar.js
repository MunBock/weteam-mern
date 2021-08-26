import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../actions/user";
import { addBoard, getBoards } from "../../actions/board";

import "./navbar.css";

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(true);

  const [title, setTitle] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const boardStore = useSelector((state) => state.boardStore);
  const { boards } = boardStore;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setSidebar(true);
      dispatch(getBoards());
    }
  }, [dispatch, userInfo]);

  const sidebarHandler = () => {
    setSidebar(!sidebar);
  };

  const closeSidebarHandler = () => {
    setSidebar(false);
  };

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBoard({ title }));
    setTitle("");
  };

  return (
    <>
      <div className="nav-bar">
        {userInfo ? (
          <i
            className={
              sidebar
                ? "fa fa-bars fa-2x nav-sidebar-icon"
                : "fa fa-bars fa-2x nav-sidebar-icon"
            }
            onClick={sidebarHandler}
          ></i>
        ) : (
          ""
        )}
        <Link className="nav-brand" to="/">
          weteam
        </Link>
        {userInfo ? (
          <div className="nav-logout" onClick={logoutHandler}>
            <i className="fa fa-sign-out icon"></i>
            Logout
          </div>
        ) : (
          <Link className="nav-login" to="/login">
            <i className="fa fa-sign-in icon"></i>
            Login
          </Link>
        )}
        <div className={sidebar ? "sidebar active" : "sidebar"}>
          <div className="sidebar-content">
            <Link to="/" className="sidebar-home" onClick={closeSidebarHandler}>
              <i className="fa fa-home fa-lg sidebar-icon"></i>
              Home
            </Link>
            <div className="sidebar-board" onClick={dropdownHandler}>
              <i className="fa fa-columns fa-lg sidebar-icon"></i>
              Board
              <i
                className={
                  dropdown
                    ? "fa fa-caret-down dropdown-icon-down"
                    : "fa fa-caret-up dropdown-icon-up"
                }
              ></i>
            </div>
            {dropdown && (
              <>
                {!boards ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {boards.map((board) => (
                      <Link
                        key={board._id}
                        to={`/board/${board._id}`}
                        className="dropdown-board-link"
                        onClick={closeSidebarHandler}
                      >
                        <div className="dropdown-board-title-container">
                          <div className="dropdown-board-title">
                            {board.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <form onSubmit={submitHandler}>
                      <input
                        required
                        type="text"
                        value={title}
                        className="create-board-input"
                        placeholder="Create new board"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
