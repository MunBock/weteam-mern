import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPriorities } from "../../actions/priority";
import { getStatuses } from "../../actions/status";
import { updateTask } from "../../actions/task";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./updatetask.css";

const UpdateTask = ({ theTask }) => {
  const id = theTask._id;

  const [title, setTitle] = useState(theTask.title);
  const [description, setDescription] = useState(theTask.description);
  const [priority, setPriority] = useState(theTask.priority._id);
  const [status, setStatus] = useState(theTask.status._id);
  const [member, setMember] = useState(theTask.member);
  const [dueDate, setDueDate] = useState(new Date(theTask.dueDate));

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
      updateTask(id, { title, description, priority, status, member, dueDate })
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
    <form className="update-form" onSubmit={submitHandler}>
      <div className="update-input-container">
        <label className="update-label">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          autoComplete="off"
          className="update-name-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="update-input-container">
        <label className="update-label">Description</label>
        <textarea
          name="description"
          value={description}
          className="update-description-textarea"
          onChange={(e) => changeHandler(e)}
          required
        />
      </div>

      <div className="update-input-container">
        <label className="update-label">Priority</label>
        <select
          name="priority"
          value={priority}
          className="update-priority-input"
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

      <div className="update-input-container">
        <label className="update-label">Status</label>
        <select
          name="status"
          value={status}
          className="update-status-input"
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

      <div className="update-input-container">
        <label className="update-label">Assigned to</label>
        <select
          name="member"
          value={member}
          className="update-assigned-input"
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

      <div className="update-input-container">
        <div className="update-date-label">Due date</div>
        <DatePicker
          selected={dueDate}
          isClearable
          required={true}
          minDate={new Date()}
          dateFormat="MMM d, yyyy"
          className="update-date-input"
          onChange={(date) => setDueDate(date)}
        />
      </div>

      <button type="submit" className="update-button">
        Update
      </button>
    </form>
  );
};

export default UpdateTask;
