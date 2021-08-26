import React from "react";

import "./optiongroup.css";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div className="option-group">
      <div className="option-group-items">
        {items.map((item) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "option-group-item active"
                : "option-group-item"
            }
          >
            {item[textProperty]}
          </div>
        ))}
      </div>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
