document.addEventListener("DOMContentLoaded", () => {
  loadTasks(); // Load tasks from local storage when the page loads

  function addTask(taskText = "", save = true) {
    const taskInput = document.getElementById("task-input");
    if (taskText === "") {
      taskText = taskInput.value.trim();
    }

    const taskList = document.getElementById("task-list");

    if (taskText !== "") {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.className = "remove-btn";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
      });

      taskItem.appendChild(removeButton);
      taskItem.classList.add("task-item");
      taskList.appendChild(taskItem);

      taskInput.value = ""; // Clear the input field after adding a task

      if (save) {
        saveTasksToLocalStorage();
      }
    } else {
      alert("Enter a task"); // Alert if the input is empty
    }
  }

  function saveTasksToLocalStorage() {
    const taskList = document.getElementById("task-list");
    const tasks = Array.from(taskList.getElementsByTagName("li")).map((li) =>
      li.textContent.replace("Remove", "").trim()
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without re-saving them
  }

  // Event listener for the Add Task button
  const addButton = document.getElementById("add-task-btn");
  addButton.addEventListener("click", () => addTask());

  // Event listener for pressing Enter to add a task
  const taskInput = document.getElementById("task-input");
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
