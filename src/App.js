/* eslint-disable array-callback-return */
import "./App.css";
import { useEffect, useState } from "react";

// get Tasks From Local Storage if it exists
const getLocalTasks = () => {
  let tasks = localStorage.getItem("Tasks");
  if (tasks) {
    return JSON.parse(localStorage.getItem("Tasks"));
  } else {
    return [];
  }
};
function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(getLocalTasks());
  let [error, setError] = useState("");
  window.onload = () => document.querySelector(".input").focus();

  // Add Task
  function addTask() {
    if (!newTask) {
      setError("Please Enter Task");
      this.preventdefault();
      return;
    }
    setError("");
    const task = {
      id: Date.now(),
      text: newTask,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  }
  // Delete Task
  function deleteTask(id) {
    const newArray = tasks.filter((task) => task.id !== id);
    setTasks(newArray);
  }
  // make All Tasks Elements
  const allTasks = tasks.map((task) => {
    return (
      <div className="task" key={task.id}>
        {task.text} <span onClick={() => deleteTask(task.id)}>Delete</span>
      </div>
    );
  });

   

  // add tasks to localStorage
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);
  // footer has button clearAll and text pending tasks
  const footer = function (tasks) {
    if (tasks.length > 0) {
      return (
        <div className="footer">
          <p>You have {tasks.length} pending tasks</p>{" "}
          <button className="clear" onClick={() =>  setTasks([])}>
            Clear All
          </button>
        </div>
      );
    } else {
      return <span></span>;
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="container">
        <div className="form">
          <input
            placeholder="✍️ Add task..."
            type="text"
            className="input"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add" onClick={() => addTask()}>
            Add
          </button>
        </div>
        <div className="error">{error}</div>
        <div className="tasks">{allTasks}</div>
        {footer(tasks)}
      </div>
    </div>
  );
}

export default App;
