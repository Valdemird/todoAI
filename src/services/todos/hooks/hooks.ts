export const useGetTaskList = (listId?: string) => {
  return {
    error: undefined,
    isLoading: false,
    data: [
      {
        "id": 127,
        "value": "elegir una guitarra",
        "order": 2,
        "completed": false,
        "list_id": 82
      },
      {
        "id": 129,
        "value": "aprender canciones",
        "order": 4,
        "completed": false,
        "list_id": 82
      },
      {
        "id": 133,
        "value": "desarrollar la coordinación mano-ojo",
        "order": 8,
        "completed": false,
        "list_id": 82
      },
      {
        "id": 135,
        "value": "leer tutoriales online.",
        "order": 10,
        "completed": false,
        "list_id": 82
      },
      {
        "id": 126,
        "value": "Estudiar acordes básicos",
        "order": 1,
        "completed": true,
        "list_id": 82
      },
      {
        "id": 128,
        "value": "practicar escalas",
        "order": 3,
        "completed": true,
        "list_id": 82
      },
      {
        "id": 130,
        "value": "buscar recursos de aprendizaje",
        "order": 5,
        "completed": true,
        "list_id": 82
      },
      {
        "id": 132,
        "value": "descubrir diferentes estilos musicales",
        "order": 7,
        "completed": true,
        "list_id": 82
      },
      {
        "id": 134,
        "value": "encontrar un profesor",
        "order": 9,
        "completed": true,
        "list_id": 82
      }
    ],
  };
};

export const useGetTodoList = () => {
  return {
    error: undefined,
    isLoading: false,
    data: [
      {
        id: 82,
        title: "aprender a tomar guitarra",
      },
    ],
  };
};

export const useTaskMutation = (listId?: string) => {
  return {
    addTask: () => console.log("addTask"),
    updateTask: () => console.log("updateTask"),
    deleteTask: () => console.log("deleteTask"),
  };
};

export const useTodoListMutation = () => {
  return {
    addTodoList: () => console.log("addTodoList"),
    deleteTodoList: () => console.log("deleteTodoList"),
  };
};

export const useAI = () => {
  return { addListWithAI:()=> console.log("addListWithAI")};
};
