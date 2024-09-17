import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

function Setter({ items, unsavedChanges, setUnsavedChanges }) {
  const saveButtonRef = useRef(null);

  const handleClick = () => {
    const task_items = JSON.stringify(items);
    localStorage.setItem("task_items", task_items);

    if (saveButtonRef.current) {
      saveButtonRef.current.textContent = "Saved";
      saveButtonRef.current.classList.remove("unsaved");
    }

    setUnsavedChanges(0);
  };

  const getButtonText = useCallback(() => {
    if (!unsavedChanges) {
      return "Saved";
    }
    return `${unsavedChanges} change(s) pending`;
  }, [unsavedChanges]);

  useEffect(() => {
    // Whenever unsavedChanges changes, update the button text
    if (saveButtonRef.current) {
      saveButtonRef.current.textContent = getButtonText();
    }
  }, [unsavedChanges, getButtonText]);

  return items.length ? (
    <button
      type="button"
      id="save-button"
      ref={saveButtonRef} // Using ref for DOM access
      className={"setter" + (unsavedChanges ? " unsaved" : "")}
      onClick={handleClick}
    >
      {getButtonText()}
    </button>
  ) : (
    <button
      type="button"
      id="no-data"
      disabled={true}
      style={{
        border: "1px solid #444",
        backgroundColor: "transparent",
        color: "#aaa",
        cursor: "default",
      }}
    >
      Add a task +
    </button>
  );
}

Setter.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
  ).isRequired,
  unsavedChanges: PropTypes.number.isRequired,
  setUnsavedChanges: PropTypes.func.isRequired,
};

export default Setter;
