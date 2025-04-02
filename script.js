document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    const loadTasks = function() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Avoid saving again when loading
    };

    // Function to save tasks to Local Storage
    const saveTasks = function() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace("Remove", "").trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to add a task
    const addTask = function(taskText, save = true) {
        if (!taskText) {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Attach event listener to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append button and list item
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save the task if not loading from Local Storage
        if (save) {
            saveTasks();
        }

        // Clear the input field
        taskInput.value = "";
    };

    // Load tasks on page load
    loadTasks();

    // Add event listener to the button
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    // Add event listener for the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});