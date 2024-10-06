import React, { useState, useEffect } from "react";
import "./styles.css";
import queryString from "query-string";

const Tasks = ({ location }) => {
    const { code } = queryString.parse(location.search);

    const [tasksData, setTasksData] = useState("none");

    useEffect(() => {
        fetch(`http://localhost:3001/tasks?${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        .then(res => res.json())
        .then(res => setTasksData(JSON.stringify(res)))
    }, [code]);

    return (
        <div className="Tasks-body">
            <h3>Tasks</h3>
            <h5 className="Content">{tasksData}</h5>
        </div>
    );
};

export default Tasks;