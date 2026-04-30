const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./inventory.db");

db.run(`
    CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY,
    name TEXT,
    quantity INTEGER,
    category TEXT,
    date TEXT, 
    low_stock_threshold INTEGER, 
    next_delivery TEXT 
    )
    `);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
//POST
app.post("/items", (req, res) => {
  const {
    name,
    quantity,
    category,
    date,
    id,
    low_stock_threshold,
    next_delivery,
  } = req.body;

  const sql =
    "INSERT INTO items (id, name, quantity, category, date, low_stock_threshold, next_delivery ) VALUES (?, ?, ?, ?, ?, ?, ?) ";
  const params = [
    id,
    name,
    quantity,
    category,
    date,
    low_stock_threshold,
    next_delivery,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(req.body);
  });
});
//GET
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

//Alerts
app.get("/items/alerts", (req, res) => {
  const sql = `
    SELECT *
    FROM items
    WHERE quantity <= low_stock_threshold
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});
//individual item
app.get("/items/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
  SELECT *
  FROM items
  WHERE id = ?  
  `;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(row);
  });
});
//delete

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  db.run("DELETE FROM items WHERE id = ?", [itemId], function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.sendStatus(204);
  });
});
// UPDATE item
app.put("/items/:id", (req, res) => {
  const { name, quantity, category, date, low_stock_threshold } = req.body;
  const id = req.params.id;

  const sql = `UPDATE items SET name = ?, quantity = ?, category = ?, date = ?, low_stock_threshold = ? WHERE id = ?`;
  const params = [name, quantity, category, date, low_stock_threshold, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Update successful" });
  });
});
