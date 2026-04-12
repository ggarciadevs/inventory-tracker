let total = 0;
let expenses = [];

function addExpense() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  if (amount.trim() === "" || name.trim() === "") return;

  const expense = {
    name: name,
    amount: Number(amount),
    category: category,
    date: date,
    id: Date.now(),
  };
  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  total += Number(amount);

  updateTotal();

  addExpenseToDom(expense);

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}
function loadExpenses() {
  const data = localStorage.getItem("expenses");

  if (data) {
    expenses = JSON.parse(data);

    expenses.forEach((expense) => {
      addExpenseToDom(expense);
      total += expense.amount;
    });

    updateTotal();
  }
}
function addExpenseToDom(expense) {
  const li = document.createElement("li");
  li.textContent = `${expense.name} (${expense.category}) - $${expense.amount} [${expense.date}]`;

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.classList.add("delete-btn");

  li.appendChild(btn);

  btn.onclick = () => {
    total -= expense.amount;

    expenses = expenses.filter((e) => e.id !== expense.id);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateTotal();
    li.remove();
  };
  document.getElementById("list").appendChild(li);
}
function updateTotal() {
  document.getElementById("total").textContent = "Total -$" + total.toFixed(2);
}
loadExpenses();
