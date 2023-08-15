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

export const addTodoList = async (newTask: TodoList): Promise<TodoList> => {
  const response = await fetch("http://localhost:50100/apilist/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return response.json();
};
