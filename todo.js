const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const storageMessage = document.getElementById("storage-message");
const storageKey = "cse391-tasks";

let tasks = [];

try {
    const savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (!Array.isArray(savedTasks) || !savedTasks.every(function (task) {
        return task && typeof task.text === "string" && typeof task.completed === "boolean";
    })) {
        throw new Error("Invalid saved task data");
    }

    tasks = savedTasks;
} catch (error) {
    storageMessage.textContent = "Saved tasks could not be loaded in this browser.";
    storageMessage.hidden = false;
}

function saveTasks() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
        storageMessage.hidden = true;
    } catch (error) {
        storageMessage.textContent = "Changes could not be saved in this browser. Keep this page open to retain your current list.";
        storageMessage.hidden = false;
    }
}

function renderTasks() {
    taskList.replaceChildren();
    emptyMessage.hidden = tasks.length > 0;

    tasks.forEach(function (task, index) {
        const item = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const text = document.createElement("span");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        text.textContent = task.text;
        item.classList.toggle("completed", task.completed);

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            item.classList.toggle("completed", task.completed);
            saveTasks();
        });

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", "Delete task: " + task.text);
        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            taskInput.focus();
        });

        label.append(checkbox, text);
        item.append(label, deleteButton);
        taskList.append(item);
    });
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.setCustomValidity("Please enter a task, not just spaces.");
        taskInput.reportValidity();
        return;
    }

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("input", function () {
    taskInput.setCustomValidity("");
});

renderTasks();
