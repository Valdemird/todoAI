import { useQuery } from "@tanstack/react-query";

import { addListWithAI, addTask, addTodoList, deleteTask, deleteTodoList, getTaskList, getTodoList, putTask } from "../api";
import { Task, TaskList, TodoList, TodoLists } from "../types";
import { useMutationCreator, useMutationWithInvalidation } from "./helpers";

const TASK_LIST_ID = "taskList";
const TODO_LIST_ID = "todoList";

export const useGetTaskList = () => {
  return useQuery<TaskList, Error>([TASK_LIST_ID], getTaskList);
};

export const useGetTodoList = () => {
  return useQuery<TodoLists, Error>([TODO_LIST_ID], getTodoList);
};

export const useTaskMutation = () => {
  const addMutation = useMutationCreator<Task>(addTask, TASK_LIST_ID);
  const updateMutation = useMutationWithInvalidation<Task>((task)=> putTask(task.id,task), [TASK_LIST_ID]);
  const deleteTaskMutation = useMutationWithInvalidation(deleteTask,[TASK_LIST_ID])
  const handleAddTask = async (task: Omit<Task, "id">) => {
    if (task.value) {
      await addMutation.mutate(task);
    }
  };
  const deleteTaskHandler = async (id: number) => {
    await deleteTaskMutation.mutate(id);
  }
  const updateTaskHandler = async (task: Task) => {
    await updateMutation.mutate(task);
  }

  return { addTask: handleAddTask, updateTask:updateTaskHandler, deleteTask: deleteTaskHandler };
};

export const useTodoListMutation = () => {
  const addMutation = useMutationCreator<Omit<TodoList, "id">>(
    addTodoList,
    TODO_LIST_ID
  );
  const deleteTodoListMutation = useMutationWithInvalidation(deleteTodoList,[TODO_LIST_ID])

  const addTodoListHandler = async (todoList: Omit<TodoList, "id">) => {
    if (todoList) {
      await addMutation.mutate(todoList);
    }
  };
  const deleteTaskHandler = async (id: number) =>
    await deleteTodoListMutation.mutate(id);

  return { addTodoList: addTodoListHandler, deleteTodoList: deleteTaskHandler };
};

export const useAI = ()=>{
  const addListWithAIMutation = useMutationWithInvalidation<string>((prompt)=> addListWithAI(prompt), [TODO_LIST_ID]);
  const addListWithAIHandler = async (prompt: string) => {await addListWithAIMutation.mutate(prompt)};

  return { addListWithAI: addListWithAIHandler };
};
