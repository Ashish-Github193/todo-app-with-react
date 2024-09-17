import { useState } from "react";
import Adder from "./components/adder";
import Items from "./components/items";
import { useEffect } from "react";

function fetchLocalStorage() {
  const items = JSON.parse(localStorage.getItem("task_items"));
  if (items) return items;

  localStorage.setItem("task_items", JSON.stringify([]));
  return [];
}

function sortWithPriority(items) {
  return items.sort((a, b) => a.priority - b.priority);
}

function App() {
  const [items, setItems] = useState(fetchLocalStorage());

  function getItemsLength() {
    return items.length + 1;
  }

  useEffect(() => {
    setItems(sortWithPriority(items));
    const task_items = JSON.stringify(items);
    localStorage.setItem("task_items", task_items);
  }, [items]);

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <Adder
          setItems={(newItem) => setItems([...items, newItem])}
          getItemsLength={getItemsLength}
        />
        <Items items={items} setItems={setItems} />
      </div>
    </>
  );
}

export default App;
