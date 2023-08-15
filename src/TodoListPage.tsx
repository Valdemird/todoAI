import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetTodoList, useTodoListMutation } from "./services/todos";
import { Button } from "./stories/Button";

import "./App.css";

const TodoListPage = () => {
  const [input, setInput] = useState("");
  const { data, error, isLoading } = useGetTodoList();
  const { addTodoList, deleteTodoList } = useTodoListMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <header>
        <h1>Task Todo List</h1>
      </header>
      <main>
        <section>
          <h2>Tasks</h2>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <Link to={`/list/${item.id}`}>{item.title}</Link>
                <button onClick={() => deleteTodoList(item.id)}>delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Add New TodoList</h2>
          <input
            type="text"
            id="newTaskInput"
            placeholder="Enter a new task"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            primary
            disabled={!input}
            onClick={() => addTodoList({ title: input })}
            label="Add Task"
          />
        </section>
      </main>
      <footer>
        <p>© {new Date().getFullYear()} My Task App</p>
      </footer>
    </div>
  );
};

export default TodoListPage;
