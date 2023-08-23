import { useState } from "react";
import { useParams } from "react-router";

import { filterOptions, useFilter } from "./hooks";
import { useGetTaskList, useGetTodoList, useTaskMutation } from "./services/todos";
import { InputTask } from "./stories/Input";
import { BaseLayout, Button, CenteredHeading } from "./stories/Layout";
import List from "./stories/List/List";
import { RadioButton } from "./stories/radioButton";

const TaskListPage = () => {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const params = useParams();
  const { data, error, isLoading } = useGetTaskList(params.todoListId);
  const { data: todoList } = useGetTodoList();
  const { setFilterParam, filteredItems } = useFilter(data);
  const { addTask, deleteTask, updateTask } = useTaskMutation(
    params.todoListId
  );

  const addTaskHandler = () => {
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
      });
    setInput("");
  };

  return (
    <BaseLayout isLoading={isLoading} error={error ?? undefined}>
      <h1>
        {todoList?.find((element) => params.todoListId == element.id.toString())
          ?.title ?? ""}
      </h1>

      <RadioButton
        onChange={(value) => {
          setFilterParam(value);
        }}
        options={filterOptions}
      ></RadioButton>
      <CenteredHeading>Tasks</CenteredHeading>
      {filteredItems && filterOptions.length && (
        <List
          items={filteredItems}
          deleteCallback={(item) => deleteTask(item.id)}
          onChange={(item) => updateTask(item)}
        />
      )}
      {showInput ? (
        <InputTask
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCreate={addTaskHandler}
          onCancel={() => setShowInput(false)}
        />
      ) : (
        <Button onClick={() => setShowInput(true)}>Add Task</Button>
      )}
    </BaseLayout>
  );
};

export default TaskListPage;
