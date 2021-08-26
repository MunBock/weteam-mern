import React from "react";

import "./priority.css";

const Priority = ({ priority }) => {
  if (priority === "High") {
    return (
      <button style={{ cursor: "text" }} className="high-priority">
        {priority}
      </button>
    );
  }
  if (priority === "Medium") {
    return (
      <button style={{ cursor: "text" }} className="medium-priority">
        {priority}
      </button>
    );
  }
  if (priority === "Low") {
    return (
      <button style={{ cursor: "text" }} className="low-priority">
        {priority}
      </button>
    );
  }
};

export default Priority;
