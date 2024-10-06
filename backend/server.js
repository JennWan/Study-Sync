const express = require("express"); // Import Express
const axios = require("axios");
const app = express(); // Initialize the Express app
const oAuth = require("./middleware/oAuth");
const port = process.env.PORT || 3000; // Define the port where the server will listen

const tasksAPIEndpoint = "http://localhost:8080/tasks";

app.use(oAuth);

// GET route to send the list of tasks to the frontend
app.get("/tasks", async (req, res) => {
    try {
        const { access_token } = req.oauth;
        const response = await axios({
            method: "GET",
            url: tasksAPIEndpoint,
            headers: { Authorization: `Bearer ${ access_token }`},
        });
        res.json(response.data);
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            res.status(401).json("Unauthorized to access data");
        } else if (error.response.status === 403) {
            res.status(403).json("Permission denied");
        } else {
            res.status(500).json("Something is wrong");
        }
    }
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`Server running on <http://localhost>:${port}`);
});

// app.post("/tasks", (req, res) => {
//     const newTask = {
//         id: tasks.length + 1, // Assign an unique ID
//         task: req.body.task // Get the task from the request body
//     };
//     tasks.push(newTask); // Add to tasks array
//     res.json(newTask); // Send back the new task
// });

// app.delete("/tasks/:id", (req, res) => {
//     const taskId = parseInt(req.params.id); // Convert id to integer
//     tasks = tasks.filter((task) => task.id !== taskId); // Remove the task
//     res.sendStatus(200); // Send OK status
// });