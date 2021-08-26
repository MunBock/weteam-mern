import React from "react";

import "./searchbox.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="search"
      placeholder="Type to search"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      autoComplete="off"
    />
  );
};

export default SearchBox;
