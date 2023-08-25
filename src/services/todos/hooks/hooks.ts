import { useQuery } from "@tanstack/react-query";

import {
  addListWithAI,
  addTask,
  addTodoList,
  deleteTask,
  deleteTodoList,
  getTaskList,
  getTodoList,
  putTask,
} from "../api";
import { Task, TaskList, TodoList, TodoLists } from "../types";
import { useMutationCreator, useMutationWithInvalidation } from "./helpers";

const TASK_LIST_ID = "taskList";
const TODO_LIST_ID = "todoList";

export const useGetTaskList = (listId?: string) => {
  return useQuery<TaskList, Error>({
    queryKey: [TASK_LIST_ID, listId],
    queryFn: () => getTaskList(listId),
  });
};

export const useGetTodoList = () => {
  return useQuery<TodoLists, Error>({
    queryKey: [TODO_LIST_ID],
    queryFn: getTodoList,
  });
};

export const useTaskMutation = (listId?: string) => {
  const cacheIds = listId ? [TASK_LIST_ID, listId.toString()] : [TASK_LIST_ID];
  const addMutation = useMutationCreator<Task>(
    addTask,
    cacheIds,
    (old = [], newTask) => [...old, newTask]
  );
  const updateMutation = useMutationCreator<Task>(
    (task) => putTask(task.id.toString(), task),
    cacheIds,
    (old = [], newTask) =>
      [...old].map((oldTask) => (oldTask.id === newTask.id ? newTask : oldTask))
  );
  const deleteTaskMutation = useMutationWithInvalidation(deleteTask, cacheIds);
  const handleAddTask = async (task: Omit<Task, "id">) => {
    if (task.value) {
      await addMutation.mutate({ ...task, id: 0 });
    }
  };
  const deleteTaskHandler = async (id: number) => {
    await deleteTaskMutation.mutate(id);
  };
  const updateTaskHandler = async (task: Task) => {
    await updateMutation.mutate(task);
  };

  return {
    addTask: handleAddTask,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
  };
};

export const useTodoListMutation = () => {
  const addMutation = useMutationCreator<Omit<TodoList, "id">>(
    addTodoList,
    [TODO_LIST_ID],
    (old = [], newTask) => [...old, newTask]
  );
  const deleteTodoListMutation = useMutationWithInvalidation(deleteTodoList, [
    TODO_LIST_ID,
  ]);

  const addTodoListHandler = async (todoList: Omit<TodoList, "id">) => {
    if (todoList) {
      await addMutation.mutate(todoList);
    }
  };
  const deleteTaskHandler = async (id: number) =>
    await deleteTodoListMutation.mutate(id);

  return { addTodoList: addTodoListHandler, deleteTodoList: deleteTaskHandler };
};

export const useAI = () => {
  const addListWithAIMutation = useMutationWithInvalidation<string>(
    (prompt) => addListWithAI(prompt),
    [TODO_LIST_ID]
  );
  const addListWithAIHandler = async (prompt: string) => {
    await addListWithAIMutation.mutate(prompt);
  };

  return {
    addListWithAI: addListWithAIHandler,
    status: addListWithAIMutation.status,
  };
};
