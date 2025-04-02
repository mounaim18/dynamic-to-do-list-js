document.addEventListener("DOMContentLoaded", () => {
  //   creating a new task
  function addTask(taskText, save = true) {
    taskText = document.getElementById("task-input").value.trim();
    const taskList = document.getElementById("task-list");

    // prevent adding an empty task
    if (taskText !== "") {
      // create a new list item for the task

      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;
      taskList.appendChild(taskItem);

      const removeButton = document.createElement("button");
      removeButton.className = "remove-btn";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", function () {
        // remove the task from the list
        taskList.removeChild(taskItem);
      });

      // update the counter
      taskItem.appendChild(removeButton);

      taskItem.classList.add("task-item");
      // taskList.appendChild(taskItem);

      // clear the input field after adding a task
      document.getElementById("task-Input").value = "";
    } else {
      // alert the user to enter a task
      alert("enter a task");
    }

    const addButton = document.getElementById("add-task-btn");
    addButton.addEventListener("click", addTask);

    // get task list
    localStorage.getItem("tasks", taskList);

    // save the tasks to local storage
    saveTasksToLocalStorage();

    // update the counter
    function saveTasksToLocalStorage() {
      const taskList = document.getElementById("taskList");
      const tasks = Array.from(taskList.taskItem).map((li) =>
        li.textContent.replace("Remove", "").trim()
      );
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // load the tasks from local storage when the page is loaded
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // add a new task when the add button is clicked

    // add the event listener to the add button
    const taskInput = document.getElementById("task-input");
    taskInput.addEventListener("keypress", function (event) {
      // if the user presses Enter, add a new task
      if (event.key === "Enter") {
        addTask();
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      loadTasks();
      // Other initialization code
    });
  }
  // add a new task when the add button is clicked
  document.addEventListener("DOMContentLoaded", addTask());
});
