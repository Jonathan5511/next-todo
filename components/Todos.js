import classes from "./Todos.module.css";

const Todos = (props) => {
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/delete-todo/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Handle successful deletion, e.g., update the UI
        console.log("Task deleted");
      } else if (response.status === 404) {
        // Task with the given ID was not found
        console.error("Task not found");
      } else {
        // Handle other errors
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markTaskAsDone = async (id) => {
    try {
      const response = await fetch(`/api/update-todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isCompleted: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const inCompleteTodos = props.todos.filter((todo) => !todo.isCompleted);

  const todoLists = inCompleteTodos.map((todo) => (
    <div key={todo.id} className={classes.container}>
      <div className={classes.title}>
        <h4>{todo.todo}</h4>
      </div>
      <div className={classes.actions}>
        <button className={classes.delete} onClick={() => deleteTask(todo.id)}>
          Delete
        </button>
        <button
          className={classes.done}
          onClick={() => markTaskAsDone(todo.id)}
        >
          Mark as Done
        </button>
      </div>
    </div>
  ));

  return <div>{todoLists}</div>;
};

export default Todos;
