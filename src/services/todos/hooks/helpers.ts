import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationCreator = <T>(
    fetchFunction: (arg: T) => Promise<T>,
    getId: string
  ) => {
    const queryCache = useQueryClient();
    const addTaskMutation = useMutation({
      mutationFn: (newTask: T) => {
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

  export const useMutationWithInvalidation = <T>(
    fetchFunction: (arg: T) => Promise<void>,
    getId: string
  ) => {
    const queryCache = useQueryClient();
    const mutation = useMutation({
        mutationFn: fetchFunction,
        onSuccess: () => {
            queryCache.invalidateQueries({ queryKey: [getId] })
        }
      })
      return mutation
  }