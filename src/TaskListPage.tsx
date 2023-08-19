import { useState } from "react";
import { useParams } from "react-router";

import { useGetTaskList, useTaskMutation } from "./services/todos";
import { Button } from "./stories/Button";
import List from "./stories/List/List";
import { RadioButton } from "./stories/radioButton";
import { useFilter } from "./hooks";

const TaskListPage = () => {
  const [input, setInput] = useState("");

  const params = useParams();
  const { data, error, isLoading } = useGetTaskList(params.todoListId);
  const { setFilterParam, filteredItems } = useFilter(data);
  const { addTask, deleteTask, updateTask } = useTaskMutation(params.todoListId);

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
        <RadioButton
          onChange={(value) => {
            setFilterParam(value);
          }}
          options={[
            { value: "done", label: "Done" },
            { value: "pending", label: "Pending" },
            { value: "all", label: "All", default: true },
          ]}
        ></RadioButton>
        <section>
          <h2>Tasks</h2>
          {filteredItems && (
            <List
              items={filteredItems}
              deleteCallback={(item) => deleteTask(item.id)}
              onChange={(item, checked) =>
                updateTask({ ...item, completed: checked })
              }
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
