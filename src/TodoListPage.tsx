import { useState } from "react";
import { Link } from "react-router-dom";

import { useAI, useGetTodoList, useTodoListMutation } from "./services/todos";
import { Button } from "./stories/Button";

import "./App.css";
import { BaseLayout } from "./components/Layout";

const TodoListPage = () => {
  const [input, setInput] = useState("");
  const { data, error, isLoading } = useGetTodoList();
  const { addTodoList, deleteTodoList } = useTodoListMutation();
  const { addListWithAI } = useAI();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BaseLayout>
        <section>
          <h2>TodoList</h2>
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
          <Button
            primary
            disabled={!input}
            onClick={() => addListWithAI(input)}
            label="AI"
          />
        </section>
        </BaseLayout>
  );
};

export default TodoListPage;
