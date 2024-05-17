import Link from "next/link";
import React, { Fragment } from "react";
import classes from "./Header.module.css";
import Todos from "./Todos";
import AddTodo from "./AddTodo";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.content}>
          <h2>Todo App</h2>
        </div>
        <ul>
          <li>
            <Link href="/completedTasks">Completed Tasks</Link>
          </li>
        </ul>
      </header>
    </Fragment>
  );
};

export default Header;
