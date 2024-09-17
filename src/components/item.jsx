import { useState } from "react";
import PropTypes from "prop-types";

function Item({ label, status, priority, deleteHandler, handleStatusChange }) {
  const [localStatus, setLocalStatus] = useState(status || false);

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setLocalStatus(isChecked);
    handleStatusChange(isChecked);
  };

  const priorityClassMapping = {
    1: "do-first",
    2: "schedule",
    3: "delegate",
    4: "eleminate",
  };

  const priorityClass = priorityClassMapping[priority];

  return (
    <div className={"item" + " " + priorityClass}>
      <input
        type="checkbox"
        className="checkbox"
        onChange={handleClick}
        checked={localStatus}
      />
      <p className="item-title">{label}</p>
      <button
        className="delete-button"
        onClick={deleteHandler}
        aria-label={`Delete ${label}`}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
  );
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.bool,
  priority: PropTypes.number.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default Item;
