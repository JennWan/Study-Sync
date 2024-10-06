function handleTaskSubmission(event) {
  event.preventDefault(); // Prevent the form from refreshing

  // Get the task input value
  let taskInputValue = document.getElementById("taskInput").value;

  if (taskInputValue.length > 20) {
    alert("Task is too long. Please limit it to 20 characters.");
  } else {
    // If valid, log the task to the console
    // console.log("Task entered:", taskInputValue);
    addTaskToBackend(taskInputValue);

    // Clear the input field after submission
    document.getElementById("taskInput").value = "";
  }
}

// Step 2: Attach the event listener to the form
document
  .getElementById("taskForm")
  .addEventListener("submit", handleTaskSubmission);

  window.addEventListener("DOMContentLoaded", fetchTasks);
//


function fetchTasks() {
  fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((tasks) => { 
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      for (let i = 0; i < tasks.length; i++) {
        const newTask = document.createElement("li");
        newTask.textContent = tasks[i].task;
        taskList.appendChild(newTask); 
      }
    });
}

function addTaskToBackend(task) {
  fetch("http://localhost:3000/tasks", {
    method: "POST", // We're sending data to the server
    headers: {
      "Content-Type": "application/json" // Tell the server we're sending JSON
    },
    body: JSON.stringify({task}) // Convert the task into a JSON string
  })
    .then((response) => response.json()) // Parse the reponse as JSON
    .then((newTask) => {
      addTaskToList(newTask); // Add the new task to the DOM
    })
    .catch((error) => {
      console.error("Error adding task:", error); //Handle any errors
    });
}

function addTaskToList(task) {
  let taskList = document.getElementById("taskList");
  let newTask = document.createElement("li");
  newTask.textContent = task.task;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Add event listener for the delete button
  deleteButton.addEventListener("click", function () {
    deleteTaskFromBackend(task.id, newTask);
  });

  newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
}

function deleteTaskFromBackend(taskId, taskElement) {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE"
  })
    .then(() => {
      taskElement.remove(); // Remove from the page
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
}