import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Groceries");

  function loadInventory() {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }

  useEffect(() => {
    loadInventory();
  }, []);
  function addItem() {
    const item = {
      id: Date.now(),
      name: name,
      quantity: Number(quantity),
      category: category,
      date: date,
    };
    console.log(item);
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then(() => {
      loadInventory();
    });
  }
  function deleteItem(id) {
    fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      loadInventory();
    });
  }

  return (
    <div>
      <h1>Inventory Tracker Dashboard</h1>

      <div className="dashboard-grid">
        <section className="card">
          <h2>Low Stock Alerts</h2>
          <p>Loading...</p>
        </section>

        <section className="card">
          <h2>Quick Add Item</h2>

          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Groceries</option>
            <option>Electronics</option>
            <option>Hardlines</option>
            <option>Fresh</option>
            <option>Softlines</option>
            <option>Health and Beauty</option>
            <option>Beer and Wine</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addItem}>Add Item</button>
        </section>

        <section className="card">
          <h2>Full Inventory</h2>

          {inventory.map((item) => (
            <p key={item.id}>
              {item.name} ({item.category}) - QTY: {item.quantity}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
