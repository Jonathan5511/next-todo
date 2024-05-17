import React, { useState } from "react";
import classes from "./AddTodo.module.css";

const AddTodo = () => {
  const [todo, setTodo] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const todoData = {
      todo,
      isCompleted: false,
    };

    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Add Your Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
};

export default AddTodo;
