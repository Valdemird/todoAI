import { Task, TaskList, TodoList, TodoLists } from "./types";

export const getTaskList = async (): Promise<TaskList> => {
  const response = await fetch(`http://localhost:50100/apitask/`);
  return response.json();
};

export const getTodoList = async (): Promise<TodoLists> => {
  const response = await fetch(`http://localhost:50100/apilist/`);
  return response.json();
};

export const addTask = async (newTask: Task): Promise<Task> => {
  const response = await fetch("http://localhost:50100/apitask/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`http://localhost:50100/apitask/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addTodoList = async (newTask:  Omit<TodoList, "id">): Promise<TodoList> => {
  const response = await fetch("http://localhost:50100/apilist/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};

export const deleteTodoList = async (id: number): Promise<void> => {
  await fetch(`http://localhost:50100/apilist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
