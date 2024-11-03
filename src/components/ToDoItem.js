import React, { useState } from "react";
import "./ToDoApp.css";

function getDueStatus(dueDate){
    const today = new Date().toISOString().split("T")[0];
    const dateDifference = new Date(dueDate) - new Date(today);

    if(dateDifference < 0 ) return "overdue";
    if(dateDifference <= 3 * 24 * 60 * 60 * 1000) return "soon";
    return "";
  }

function ToDoItem({
  todo,
  index,
  toggleComplete,
  deleteToDo,
  editToDo,
  updateToDoText,
}) {
  const [newText, setNewText] = useState(todo.text);
  const dueStatus = getDueStatus(todo.dueDate);
  const getPriorityClass = (priority) => {
    switch(priority){
        case "High":
            return "high-priority";
        case "Medium":
            return "medium-priority";
        case "Low":
        default:
            return "low-priority";
    }
  };

  return (
    <li className={`todo-item ${getPriorityClass(todo.priority)} ${todo.completed ? "completed" : ""} ${dueStatus}`}>
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="edit-input"
          />
          <button
            onClick={() => updateToDoText(index, newText)}
            className="save-button"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(index)} className="todo-text">
            {todo.text}
          </span>
          { todo.dueDate && (
            <span className="due-date">Due: {todo.dueDate}</span>
          )}
          <button onClick={() => editToDo(index)} className="edit-button">
            Edit
          </button>
          <button onClick={() => deleteToDo(index)} className="delete-button">
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default ToDoItem;
