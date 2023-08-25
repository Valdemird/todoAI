import { useMutation, useQueryClient } from "@tanstack/react-query";

const showAlert = () => {
  alert(`Error syncing with the server. Please try again later.`);
};
export const useMutationCreator = <T>(
  fetchFunction: (arg: T) => Promise<T>,
  getId: string[],
  optimisticBehaviorCallback: (old: T[] | undefined, newElement: T) => T[]
) => {
  const queryCache = useQueryClient();
  const addElementMutation = useMutation({
    mutationFn: (newElement: T) => {
      return fetchFunction(newElement);
    },
    onMutate: async (newElement) => {
      await queryCache.cancelQueries({ queryKey: getId });

      const previousElement = queryCache.getQueryData(getId);

      queryCache.setQueryData(getId, (old: T[] | undefined) =>
        optimisticBehaviorCallback(old, newElement)
      );

      return { previousElement };
    },
    onError: (_, __, context) => {
      showAlert();
      queryCache.setQueryData(getId, context?.previousElement);
    },
    onSettled: () => {
      queryCache.invalidateQueries({ queryKey: getId });
    },
  });

  return addElementMutation;
};

export const useMutationWithInvalidation = <T>(
  fetchFunction: (arg: T) => Promise<void>,
  getIds: string[]
) => {
  const queryCache = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetchFunction,
    onError: () => {
      showAlert();
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: getIds });
    },
  });
  return mutation;
};
