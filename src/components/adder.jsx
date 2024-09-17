import { useRef } from "react";
import PropTypes from "prop-types";

function Adder({ setItems, getItemsLength }) {
  const inputRef = useRef(null);
  const priorityRef = useRef(null);

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const status = false;
    const task_title = inputRef.current.value;
    const priority = Number(priorityRef.current.value);

    if (task_title.trim() !== "") {
      const _id = getItemsLength() + 1;
      setItems({
        id: _id,
        label: task_title,
        status: status,
        priority: priority,
      });
    }

    // Clear input
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="adder">
      <input
        type="text"
        id="input"
        ref={inputRef}
        className="input"
        placeholder="Enter task"
        onKeyDown={onKeyDown}
      />
      <select className="dropdown" ref={priorityRef}>
        <option value="1">Do First</option>
        <option value="2">Schedule</option>
        <option value="3">Delegate</option>
        <option value="4">Eleminate</option>
      </select>
    </div>
  );
}

Adder.propTypes = {
  setItems: PropTypes.func.isRequired,
  getItemsLength: PropTypes.func.isRequired,
};

export default Adder;
