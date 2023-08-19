import { useMemo, useState } from "react";
import { useParams } from "react-router";

import { useGetTaskList, useTaskMutation } from "./services/todos";
import { Button } from "./stories/Button";
import List from "./stories/List/List";
import { Header } from "./stories/Header";

const TaskListPage = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const { data, error, isLoading } = useGetTaskList();
  const { addTask, deleteTask, updateTask } = useTaskMutation();
  const filteredItems = useMemo(() => {
    if (params.todoListId && data)
      return [...data]
        ?.filter((item) => item.list_id.toString() === params.todoListId)
        .sort((a, b) => a.order - b.order);
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
          {filteredItems && (
            <List
              items={filteredItems}
              deleteCallback={(item) => deleteTask(item.id)}
              onChange={(item) => updateTask({ item })}
            />
          )}
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
                order:
                  (filteredItems?.reduce((maxObject, currentObject) => {
                    return currentObject.order > maxObject.order
                      ? currentObject
                      : maxObject;
                  }, filteredItems[0])?.order ?? 0) + 1,
                completed: false,
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
