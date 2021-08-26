import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPriorities } from "../../actions/priority";
import { getStatuses } from "../../actions/status";
import { createTask } from "../../actions/task";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./createtask.css";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [member, setMember] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const priorityStore = useSelector((state) => state.priorityStore);
  const { priorities } = priorityStore;

  const statusStore = useSelector((state) => state.statusStore);
  const { statuses } = statusStore;

  const boardStore = useSelector((state) => state.boardStore);
  const { board } = boardStore;
  const { members } = board;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriorities());
    dispatch(getStatuses());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTask({ title, description, priority, status, member, dueDate })
    );
  };

  const resizeInputHandler = (element) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const changeHandler = (e) => {
    setDescription(e.target.value);
    resizeInputHandler(e);
  };

  return (
    <form className="create-form" onSubmit={submitHandler}>
      <div className="create-input-container">
        <label className="create-label">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          autoComplete="off"
          className="create-name-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="create-input-container">
        <label className="create-label">Description</label>
        <textarea
          name="description"
          value={description}
          className="create-description-textarea"
          onChange={(e) => changeHandler(e)}
          required
        />
      </div>

      <div className="create-input-container">
        <label className="create-label">Priority</label>
        <select
          name="priority"
          value={priority}
          className="create-priority-input"
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="" />
          {priorities.map((priority) => (
            <option key={priority._id} value={priority._id}>
              {priority.name}
            </option>
          ))}
        </select>
      </div>

      <div className="create-input-container">
        <label className="create-label">Status</label>
        <select
          name="status"
          value={status}
          className="create-status-input"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" />
          {statuses.map((status) => (
            <option key={status._id} value={status._id}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      <div className="create-input-container">
        <label className="create-label">Assigned to</label>
        <select
          name="member"
          value={member}
          className="create-assigned-input"
          onChange={(e) => setMember(e.target.value)}
          required
        >
          <option value="" />
          {members.map((member) => (
            <option key={member.user} value={member.user}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className="create-input-container">
        <div className="create-date-label">Due date</div>
        <DatePicker
          selected={dueDate}
          isClearable
          required={true}
          minDate={new Date()}
          dateFormat="MMM d, yyyy"
          className="create-date-input"
          onChange={(date) => setDueDate(date)}
        />
      </div>

      <button type="submit" className="create-button">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
