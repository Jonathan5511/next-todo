import React, { Fragment } from "react";
import Header from "../components/Header";
import { MongoClient } from "mongodb";
import CompletedTodos from "../components/CompletedTodos";

const completedTasks = (props) => {
  return (
    <Fragment>
      <Header />
      <h2>Congratulations On Task Completions</h2>
      <CompletedTodos todos={props.todos} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://jonathan:rLvjt5YZu0Ny3Bhs@cluster0.rrqsftw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();

  client.close();
  return {
    props: {
      todos: todos.map((todo) => ({
        todo: todo.todo,
        id: todo._id.toString(),
        isCompleted: todo.isCompleted,
      })),
    },
    revalidate: 1,
  };
};

export default completedTasks;
