import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITodo } from "../../interfaces/ITodo";
import { Todo } from "../todo/Todo";
import { enrichTodos } from "./utils";
import styles from './styles.module.css';

export type IPureTodo = Pick<ITodo, "userId" | "id" | "title" | "completed">;
export const TodoList = () => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function getTodos() {
      try {
        const responce = await axios.get(
          "https://jsonplaceholder.typicode.com/todos",
          {
            params: { _page: 1 },
          }
        );
        const enrichedTodos = enrichTodos(responce?.data as IPureTodo[]);
        setTodos(enrichedTodos);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      }
    }
    getTodos();
  }, []);

  if (error) return <div>Error: {error}!</div>;

  return (
    <div className={styles.todoList}>
      <header className={styles.header}>
        <div className={styles.title}>Today</div>
        <div className={styles.actionContainer}>
          
          <button className={styles.plus}>+</button>
          <div className={styles.total}>{todos.length}</div>
        </div>
      </header>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.userId} {...todo}/>
      ))}
    </div>
  );
};
