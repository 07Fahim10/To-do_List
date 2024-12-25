const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const status = document.getElementById("status");

let tasks = [];
let taskId = 1;


function updateStatus() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    status.textContent = `${total} Total, ${completed} Completed, ${pending} Pending`;
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return alert("At first you have to Submit a Task!");


    const date = new Date().toLocaleDateString();
    const task = { id: taskId++, text: taskText, date, completed: false };


    tasks.push(task);
    renderTasks();
    taskInput.value = "";
    updateStatus();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateStatus();
}


function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
    updateStatus();
}


function renderTasks() {
    taskList.innerHTML = tasks
    .map(
        (task, index) => `
        <tr class="text-center ${task.completed ? "line-through text-gray-500" : ""}">
            <td class="border md:p-2 text-[10px] md:text-[18px]">${index + 1}</td>
            <td class="border md:p-2 text-[10px] md:text-[18px]">${task.text}</td>
            <td class="border md:p-2 text-[10px] md:text-[18px]">${task.date}</td>
            <td class="border md:p-2 text-[10px] md:text-[18px]">
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})">
            </td>
            <td class="border p-2">
            <button class="text-red-500" onclick="deleteTask(${task.id})">🗑</button>
            </td>
        </tr>
        `
    )
    .join("");
}


addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});
