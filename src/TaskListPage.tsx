import { useMemo, useState } from "react";
import { useParams } from "react-router";

import { useAddTask, useGetTaskList } from "./services/todos";
import { Button } from "./stories/Button";

const TaskListPage = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const { data, error, isLoading } = useGetTaskList();
  const { addTask } = useAddTask();
  const filteredItems = useMemo(() => {
    if (params.todoListId && data)
      return data?.filter(
        (item) => item.list_id.toString() === params.todoListId
      );
  }, [data, params.todoListId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <header>
        <h1>Task List</h1>
      </header>
      <main>
        <section>
          <h2>Tasks</h2>
          <ul>
            {filteredItems?.map((item) => (
              <li key={item.id}>{item.value}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Add New Task</h2>
          <input
            type="text"
            id="newTaskInput"
            placeholder="Enter a new task"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            primary
            disabled={!input}
            onClick={() =>
              params.todoListId &&
              addTask({
                value: input,
                list_id: parseInt(params.todoListId, 10),
                order: 0,
              })
            }
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

export default TaskListPage;
