import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UpdateTask from "../UpdateTask/UpdateTask";
import Priority from "../Priority/Priority";
import Status from "../Status/Status";

import { deleteTask } from "../../actions/task";
import { formatDate } from "../../utils/formatDate";

import "./tasktable.css";

const TaskTable = ({ task }) => {
  const id = task._id;

  const [showModal, setShowModal] = useState(false);

  const boardStore = useSelector((state) => state.boardStore);
  const { board } = boardStore;
  const { members } = board;

  const dispatch = useDispatch();

  useEffect(() => closeModalHandler(), [task]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => setShowModal(false);

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <>
      <td className="table-title">{task.title}</td>
      <td className="table-member">
        {members.map((member) =>
          member.user === task.member ? member.name : ""
        )}
      </td>
      <td className="table-priority">
        <Priority priority={task.priority.name} />
      </td>
      <td className="table-dueDate">{formatDate(new Date(task.dueDate))}</td>
      <td className="table-status">
        <Status status={task.status.name} />
      </td>
      <td className="table-description">{task.description}</td>
      <td>
        <div className="option-edit" onClick={() => showModalHandler()}>
          Edit
        </div>
      </td>
      <td>
        <div className="option-delete" onClick={() => deleteHandler()}>
          Delete
        </div>
      </td>

      {showModal && (
        <div className="update-modal-place">
          <div className="update-modal-container">
            <div className="update-modal-header-container">
              <div className="update-modal-title">Update task</div>
              <i
                className="fa fa-times fa-2x update-modal-close-button"
                onClick={closeModalHandler}
              ></i>
            </div>
            <UpdateTask theTask={task} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskTable;
