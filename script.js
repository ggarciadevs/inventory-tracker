let total = 0

function addExpense(){
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    if (amount.trim() ==="" || name.trim() ==="") return

    total+=Number(amount)

    updateTotal()

    const li = document.createElement("li");
    li.textContent = name + "- $" + amount;

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    li.appendChild(btn);

    btn.onclick = () =>{
        total -= Number(amount)
        updateTotal()
        li.remove()
    }

    document.getElementById("list").appendChild(li);

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";


}
function updateTotal(){
    document.getElementById("total").textContent = "Total -$" + total

}
