
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = loadTasks();
let currentFilter = "all";

// Set the minimum due date to today.
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

taskDate.min = localToday;

// Load saved tasks safely.
function loadTasks() {
    try {
        const savedTasks = JSON.parse(
            localStorage.getItem("studentTasks") || "[]"
        );

        if (!Array.isArray(savedTasks)) {
            return [];
        }

        return savedTasks.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            ["High", "Medium", "Low"].includes(task.priority) &&
            typeof task.date === "string" &&
            typeof task.completed === "boolean"
        );
    } catch (error) {
        console.error("Unable to load saved tasks:", error);
        return [];
    }
}

// Save tasks in browser storage.
function saveTasks() {
    try {
        localStorage.setItem("studentTasks", JSON.stringify(tasks));
        return true;
    } catch (error) {
        alert("Unable to save tasks. Check your browser storage settings.");
        console.error("Unable to save tasks:", error);
        return false;
    }
}

// Add a new task.
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const priority = taskPriority.value;
    const date = taskDate.value;

    if (!title) {
        alert("Please enter a task name.");
        return;
    }

    if (!date || date < localToday) {
        alert("Please choose today or a future due date.");
        return;
    }

    const newTask = {
        id: createTaskId(),
        title: title,
        priority: priority,
        date: date,
        completed: false
    };

    tasks.push(newTask);

    if (!saveTasks()) {
        tasks.pop();
        return;
    }

    taskForm.reset();
    taskPriority.value = "Medium";
    taskDate.min = localToday;

    renderTasks();
});

// Generate a unique task ID.
function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }

    return Date.now().toString() + Math.random().toString(36).slice(2);
}

// Display tasks.
function renderTasks() {
    taskList.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchText);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    emptyMessage.hidden = filteredTasks.length > 0;
    emptyMessage.textContent = tasks.length === 0
        ? "No tasks yet. Add your first task!"
        : "No matching tasks found.";

    filteredTasks.forEach(task => {
        const item = document.createElement("article");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due date: " + task.date;

        const priority = document.createElement("span");
        priority.className = "priority " + task.priority;
        priority.textContent = task.priority + " Priority";

        info.append(title, dueDate, priority);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.setAttribute(
            "aria-label",
            (task.completed ? "Mark pending: " : "Complete: ") + task.title
        );
        completeButton.addEventListener("click", () => toggleTask(task.id));

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actions.append(completeButton, editButton, deleteButton);
        item.append(info, actions);
        taskList.appendChild(item);
    });

    updateDashboard();
}

// Mark a task complete or pending.
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = !task.completed;

    if (!saveTasks()) {
        task.completed = !task.completed;
        return;
    }

    renderTasks();
}

// Edit a task.
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const newTitle = prompt("Edit task name:", task.title);

    if (newTitle === null) return;

    const cleanedTitle = newTitle.trim();

    if (!cleanedTitle) {
        alert("Task name cannot be empty.");
        return;
    }

    const oldTitle = task.title;
    task.title = cleanedTitle;

    if (!saveTasks()) {
        task.title = oldTitle;
        return;
    }

    renderTasks();
}

// Delete a task.
function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) return;

    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) return;

    const removedTask = tasks.splice(index, 1)[0];

    if (!saveTasks()) {
        tasks.splice(index, 0, removedTask);
        return;
    }

    renderTasks();
}

// Update task counts and progress bar.
function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressText").textContent =
        progress + "% completed";

    document.getElementById("progressBar").setAttribute(
        "role", "progressbar"
    );
    document.getElementById("progressBar").setAttribute(
        "aria-valuenow", progress
    );
    document.getElementById("progressBar").setAttribute(
        "aria-valuemin", "0"
    );
    document.getElementById("progressBar").setAttribute(
        "aria-valuemax", "100"
    );
}

// Filter buttons.
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function () {
        currentFilter = this.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle("active", btn === this);
        });

        renderTasks();
    });
});

// Search tasks.
searchInput.addEventListener("input", renderTasks);

// Initial display.
renderTasks();