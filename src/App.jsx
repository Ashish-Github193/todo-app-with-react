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

function App() {
  const [items, setItems] = useState(fetchLocalStorage());

  useEffect(() => {
    const task_items = JSON.stringify(items);
    localStorage.setItem("task_items", task_items);
  }, [items]);

  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <Adder items={items} setItems={setItems} />
        <Items items={items} setItems={setItems} />
      </div>
    </>
  );
}

export default App;
