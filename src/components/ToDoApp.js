import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoApp.css";

function TodoApp() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'completed', or 'uncompleted'
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      todos.forEach((todo) => {
        if (
          todo.dueDate &&
          new Date(todo.dueDate) - now <= 24 * 60 * 60 * 1000 &&
          new Date(todo.dueDate) > now
        ) {
          new Notification("Reminder", {
            body: `Task "${todo.text}" is due soon!`,
          });
        }
      });
    };

    const interval = setInterval(checkDueTasks, 60000);
    return () => clearInterval(interval);
  }, [todos]);


  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, dueDate, priority, completed: false }]);
      setInput("");
      setDueDate("");
      setPriority("Low");
    }
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "uncompleted") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos; // 'all' case
  };

  const editToDo = (index) => {
    setTodos(
        todos.map((todo,i) => 
            i === index ? { ...todo, isEditing: true } : todo )
    );
  };

  const updateToDoText = (index, newText) => {
    setTodos(
        todos.map((todo,i) => 
            i === index ? { ...todo,text: newText, isEditing: false }: todo )
    );
  };

  return (
    <div className="app-container">
      <h2 className="app-title">My To-Do List</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-dropdown"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTodo} className="add-button">Add Task</button>
      </div>

      <div className="filter-section">
        <button onClick={() => setFilter("all")} className="filter-button">All</button>
        <button onClick={() => setFilter("completed")} className="filter-button">Completed</button>
        <button onClick={() => setFilter("uncompleted")} className="filter-button">Uncompleted</button>
      </div>
      <ul className="todo-list">
        {filteredTodos().map((todo, index) => (
          <ToDoItem
            key={index}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
            updateToDoText={updateToDoText}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
