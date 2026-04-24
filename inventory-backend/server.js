const express = require("express");
const cors = require("cors");
// Initialize the app
const app = express();
const PORT = 3000;

//middleware
app.use(cors()); //allows front end to communicate with backend
app.use(express.json()); //allows server to read incoming JSON data

let items = [];
//GET all items
app.get("/items", (req, res) => {
  res.json(items);
});
//POST new item

app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.json(item);
});
//Delete Item
app.delete("/items/:id", (req, res) => {
  items = items.filter((item) => item.id != req.params.id);
  res.sendStatus(204);
});
//update item
app.put("/items/:id", (req, res) => {
  items = items.map((item) =>
    item.id == req.params.id ? { ...item, ...req.body } : item,
  );
  res.json(req.body);
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
