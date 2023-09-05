import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { ITodo } from "../../interfaces/ITodo";
import { Todo } from "../todo/Todo";
import { enrichTodos } from "./utils";
import styles from "./styles.module.css";
import { useIntersectionObserver } from "usehooks-ts";

export type IPureTodo = Pick<ITodo, "userId" | "id" | "title" | "completed">;
export const TodoList = () => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsloading] = useState(false);

  const loadMoreRef = useRef(null);
  const isFirstRender = useRef(true);
  const entry = useIntersectionObserver(loadMoreRef, {});

  useEffect(() => {
    async function getTodos() {
      try {
        const responce = await axios.get(
          "https://jsonplaceholder.typicode.com/todos",
          {
            params: { _page: page },
          }
        );
        const enrichedTodos = enrichTodos(responce?.data as IPureTodo[]);
        setTodos((prevTodos) => [...prevTodos, ...enrichedTodos]);
        setIsloading(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      }
    }
    getTodos();
  }, [page]);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (entry?.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
        setIsloading(true);
      }
    } else {
      isFirstRender.current = false;
    }
  }, [entry]);

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
      {todos.length && (
        <>
          {todos.map((todo: ITodo) => (
            <Todo key={todo.id} {...todo} />
          ))}
          {isLoading && <div>Loading...</div>}
          <div ref={loadMoreRef} style={{ height: "1px" }}></div>
        </>
      )}
    </div>
  );
};
