let tasks = [];

const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter-select");
const deleteAllBtn = document.getElementById("delete-all");

function renderTasks(list = tasks) {
  console.log("Rendering tasks:", list); // debug
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = 
        '<tr><td colspan="4" style="text-align:center;">No tasks found</td></tr>';
    return;
  }

  list.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.status}</td>
      <td>
        <button type="button" onclick="toggleStatus(${index})">✔</button>
        <button type="button" onclick="deleteTask(${index})" class="danger">✖</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (!text || !date) {
    alert("Please enter task and due date!");
    return;
  }

  tasks.push({ text, date, status: "Active" });
  todoInput.value = "";
  dateInput.value = "";
  renderTasks();
});

function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "Active" ? "Completed" : "Active";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

deleteAllBtn.addEventListener("click", () => {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

filterSelect.addEventListener("change", () => {
  const filter = filterSelect.value;
  if (filter === "all") {
    renderTasks();
  } else {
    const filtered = tasks.filter(
      (t) => t.status.toLowerCase() === filter
    );
    renderTasks(filtered);
  }
});

renderTasks();