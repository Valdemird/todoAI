import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, getTodoList } from "./api";
import { Task, TaskList } from "./types";



export const useGetList = ()=> {
    return useQuery<TaskList,Error>(['todoList'],getTodoList);
}

