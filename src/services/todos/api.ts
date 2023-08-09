import { Task, TaskList } from "./types";

export const getTodoList = async (): Promise<TaskList> => {
    const response = await fetch(`http://localhost:50100/api/todos`);
    return response.json()
}

export const addTodo = async (newTask:Task): Promise<Task> => {
    const response = await fetch('http://localhost:50100/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    return response.json()
}