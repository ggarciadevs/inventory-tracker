let totalItems = 0;
let inventory = [];
let editItem = null;

function addItem() {
  const name = document.getElementById("itemName").value;
  const quantity = document.getElementById("quantity").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  if (quantity.trim() === "" || name.trim() === "") return;

  if (editItem !== null) {
    const item = inventory.find((i) => i.id === editItem);

    item.name = name;
    item.quantity = Number(quantity);
    item.category = category;
    item.date = date;

    editItem = null;
  } else {
    const item = {
      name: name,
      quantity: Number(quantity),
      category: category,
      date: date,
      id: Date.now(),
    };
    inventory.push(item);
  }

  localStorage.setItem("inventory", JSON.stringify(inventory));

  renderList(inventory);

  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("date").value = "";
}

function loadInventory() {
  const data = localStorage.getItem("inventory");

  if (data) {
    inventory = JSON.parse(data);
    renderList(inventory);
  }
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.textContent = `${item.name} (${item.category}) - Qty: ${item.quantity} [Stocked: ${item.date}]`;

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Remove";
  deletebtn.classList.add("delete-btn");

  deletebtn.onclick = () => {
    inventory = inventory.filter((i) => i.id !== item.id);

    localStorage.setItem("inventory", JSON.stringify(inventory));

    renderList(inventory);
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  editBtn.onclick = () => {
    document.getElementById("itemName").value = item.name;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("category").value = item.category;
    document.getElementById("date").value = item.date;

    editItem = item.id;
  };

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-group");

  buttonContainer.appendChild(deletebtn);
  buttonContainer.appendChild(editBtn);

  li.appendChild(buttonContainer);
  document.getElementById("list").appendChild(li);
}

function updateTotal() {
  document.getElementById("totalItems").textContent =
    "Total Items in Stock: " + totalItems;
}

function renderList(filteredItems) {
  document.getElementById("list").innerHTML = "";
  totalItems = 0;

  filteredItems.forEach((item) => {
    addItemToDom(item);
    totalItems += item.quantity;
  });

  updateTotal();
}

function filterItems() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const selectedCategory = document.getElementById("filterCategory").value;

  const filtered = inventory.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchValue);
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesName && matchesCategory;
  });

  renderList(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterItems);
document
  .getElementById("filterCategory")
  .addEventListener("change", filterItems);

loadInventory();
