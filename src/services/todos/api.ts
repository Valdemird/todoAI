import { Task, TaskList, TodoList, TodoLists } from "./types";

const HOST = `${import.meta.env.VITE_HOST}/api`;
const TASK = "/task/";
const LIST = "/list/";
const AI = "/langchain/";

export const getTaskList = async (listId?: number): Promise<TaskList> => {
  const response = await fetch(`${HOST}${TASK}?listId=${listId ?? ""}`);
  return response.json();
};

export const getTodoList = async (): Promise<TodoLists> => {
  const response = await fetch(`${HOST}${LIST}`);
  return response.json();
};

export const addTask = async (newTask: Task): Promise<Task> => {
  const response = await fetch(`${HOST}${TASK}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${HOST}${TASK}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const putTask = async (id: number, newTask: Task): Promise<Task> => {
  const response = await fetch(`${HOST}${TASK}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};

export const addTodoList = async (
  newTask: Omit<TodoList, "id">
): Promise<TodoList> => {
  const response = await fetch(`${HOST}${LIST}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};

export const deleteTodoList = async (id: number): Promise<void> => {
  await fetch(`${HOST}${LIST}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addListWithAI = async (prompt: string): Promise<void> => {
  await fetch(`${HOST}${AI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
};
