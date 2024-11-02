import React, { useState } from "react";
import "./ToDoApp.css";

function ToDoItem({ todo, index, toggleComplete, deleteToDo, editToDo, updateToDoText }) {
    const [newText, setNewText ] = useState(todo.text);
  return (
    <li
        className={`todo-item ${todo.completed ? 'completed' : ''}`}
        >
            {todo.isEditing ? (
                <>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="edit-input"
                    />
                    <button onClick={() => updateToDoText(index, newText)} className="save-button">Save</button>
                </>
            ) : (
                <>
                    <span onClick={() => toggleComplete(index)} className="todo-text">{todo.text}</span>
                    <button onClick={() => editToDo(index)}className="edit-button">Edit</button>
                    <button onClick={() => deleteToDo(index)} className="delete-button">Delete</button>
                </>
            )}
        </li>
    );
}

export default ToDoItem;
