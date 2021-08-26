import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addMember } from "../../actions/board";

import "./addmember.css";

const AddMember = () => {
  const boardStore = useSelector((state) => state.boardStore);
  const { error } = boardStore;

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setUsername("");
    dispatch(addMember(username));
  };

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      return "";
    } else {
      toast.error(`${error}`);
    }
  }, [error]);

  return (
    <>
      <form className="username-form" onSubmit={submitHandler}>
        <input
          type="text"
          value={username}
          required
          placeholder="Enter username"
          className="username-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="add-member-submit-button">
          <i className="fa fa-plus fa-lg"></i>
        </button>
      </form>
    </>
  );
};

export default AddMember;
