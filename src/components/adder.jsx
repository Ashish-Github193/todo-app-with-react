import { useRef } from "react";
import PropTypes from "prop-types";

function sortWithPriority(items) {
  return items.sort((a, b) => a.priority - b.priority);
}

function Adder({ items, setItems }) {
  const inputRef = useRef(null);
  const priorityRef = useRef(null);

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const status = false;
    const task_title = inputRef.current.value;
    const priority = Number(priorityRef.current.value);

    if (task_title.trim() !== "") {
      const _id = items.length + 1;
      const newItem = {
        id: _id,
        label: task_title,
        status: status,
        priority: priority,
      };

      const newItems = sortWithPriority([...items, newItem]);
      setItems(newItems);
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.bool,
      priority: PropTypes.number,
    }),
  ).isRequired,
  setItems: PropTypes.func.isRequired,
};

export default Adder;
