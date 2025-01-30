document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class='complete' onclick='completeTask(this)'>✔</button> <button class='delete' onclick='removeTask(this)'>X</button>`;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function completeTask(button) {
    let li = button.parentElement;
    li.classList.toggle("completed");
    saveTasks();
}

function removeTask(button) {
    let li = button.parentElement;
    li.style.transition = "0.3s";
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";
    setTimeout(() => {
        li.remove();
        saveTasks();
    }, 300);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.childNodes[0].nodeValue.trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button class='complete' onclick='completeTask(this)'>✔</button> <button class='delete' onclick='removeTask(this)'>X</button>`;
        if (task.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}
