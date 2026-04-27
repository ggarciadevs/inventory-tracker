const express = require("express");
const cors = require("cors");
// Initialize the app
const app = express();
const PORT = 3000;

//middleware
app.use(cors()); //allows front end to communicate with backend
app.use(express.json()); //allows server to read incoming JSON data

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./inventory.db");

db.run(`
  CREATE TABLE IF NOT EXISTS items(
  id INTEGER PRIMARY KEY,
  name TEXT,
  quantity INTEGER,
  category TEXT, 
  date TEXT
  )
  `);
//GET all items
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});
//POST new item

app.post("/items", (req, res) => {
  const { name, quantity, category, date, id } = req.body;

  db.run(
    "INSERT INTO items (id, name, quantity, category, date) VALUES (?, ?, ?, ?, ?)",
    [id, name, quantity, category, date],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id, name, quantity, category, date });
    },
  );
});
//Delete Item
app.delete("/items/:id", (req, res) => {
  db.run("DELETE FROM items WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
});
//update item
app.put("/items/:id", (req, res) => {
  const { name, quantity, category, date } = req.body;

  db.run(
    "UPDATE items SET name = ?, quantity = ?, category = ?, date = ? WHERE id = ?",
    [name, quantity, category, date, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json(req.body);
    },
  );
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test Route
// app.get("/", (req, res) => {
//   res.send("Backend is runningt");
// });
// //start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
