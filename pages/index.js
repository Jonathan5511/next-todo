import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";

const DUMMY_TODOS = [];

const Home = (props) => {
  return (
    <Fragment>
      <Header />
      <Todos todos={props.todos} />
      <AddTodo />
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

export default Home;
