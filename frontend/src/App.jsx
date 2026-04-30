import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, []);

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

          <input type="text" placeholder="Item Name" />
          <input type="number" placeholder="Quantity" />

          <select>
            <option>Groceries</option>
            <option>Electronics</option>
            <option>Hardlines</option>
            <option>Fresh</option>
            <option>Apparel</option>
            <option>Other</option>
          </select>

          <input type="date" />

          <button>Add Item</button>
        </section>

        <section className="card">
          <h2>Full Inventory</h2>

          {inventory.map((item) => (
            <p key={item.id}>
              {item.name} ({item.category}) - QTY: {item.quantity}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
