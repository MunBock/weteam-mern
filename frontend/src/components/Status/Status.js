import React from "react";

import "./status.css";

const Status = ({ status }) => {
  if (status === "Not Started") {
    return (
      <button style={{ cursor: "text" }} className="not-started-status">
        {status}
      </button>
    );
  }
  if (status === "In Progress") {
    return (
      <button style={{ cursor: "text" }} className="in-progress-status">
        {status}
      </button>
    );
  }
  if (status === "In Review") {
    return (
      <button style={{ cursor: "text" }} className="in-review-status">
        {status}
      </button>
    );
  }
  if (status === "Completed") {
    return (
      <button style={{ cursor: "text" }} className="completed-status">
        {status}
      </button>
    );
  }
  if (status === "Blocked") {
    return (
      <button style={{ cursor: "text" }} className="blocked-status">
        {status}
      </button>
    );
  }
  if (status === "Cancelled") {
    return (
      <button style={{ cursor: "text" }} className="cancelled-status">
        {status}
      </button>
    );
  }
};

export default Status;
