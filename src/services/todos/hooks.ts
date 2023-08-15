import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addTask, addTodoList, getTaskList, getTodoList } from "./api";
import { Task, TaskList, TodoList, TodoLists } from "./types";

const TASK_LIST_ID = "taskList";
const TODO_LIST_ID = "todoList";

export const useGetTaskList = () => {
  return useQuery<TaskList, Error>([TASK_LIST_ID], getTaskList);
};

export const useGetTodoList = () => {
  return useQuery<TodoLists, Error>([TODO_LIST_ID], getTodoList);
};

const useMutationCreator = <T>(
  fetchFunction: (arg: T) => Promise<T>,
  getId: string
) => {
  const queryCache = useQueryClient();
  const addTaskMutation = useMutation({
    mutationFn: (newTask) => {
      return fetchFunction(newTask);
    },
    onMutate: async (newTodo) => {
      await queryCache.cancelQueries({ queryKey: [getId] });

      const previousTodos = queryCache.getQueryData([getId]);

      queryCache.setQueryData([getId], (old) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryCache.setQueryData([getId], context.previousTodos);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ queryKey: [getId] });
    },
  });

  return addTaskMutation;
};

export const useAddTask = () => {
  const addMutation = useMutationCreator<Task>(addTask, TASK_LIST_ID);

  const handleAddTask = async (task: Omit<Task, "id">) => {
    if (task.value) {
      await addMutation.mutate(task);
    }
  };

  return { addTask: handleAddTask };
};

export const useAddTodoList = () => {
  const addMutation = useMutationCreator<TodoList>(addTodoList, TODO_LIST_ID);
  const addTodoListHandler = async (todoList: Omit<TodoList, "id">) => {
    if (todoList) {
      await addMutation.mutate(todoList);
    }
  };

  return { addTodoList: addTodoListHandler };
};
