import Item from "./item";
import PropTypes from "prop-types";

function Items({ items, setItems }) {
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleStatusChange = (index, status) => {
    const newItems = [...items];
    newItems[index].status = status;
    setItems(newItems);
  };

  return (
    items.length > 0 && (
      <div id="task-container">
        {items.map((item, index) => (
          <Item
            key={index}
            label={item.label}
            status={item.status}
            priority={item.priority}
            deleteHandler={() => deleteItem(index)}
            handleStatusChange={(status) => handleStatusChange(index, status)}
          />
        ))}
      </div>
    )
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
  ).isRequired,
  setItems: PropTypes.func.isRequired,
};

export default Items;
