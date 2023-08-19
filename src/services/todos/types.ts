export interface Task {
  id: number;
  value: string;
  order: number;
  completed: boolean,
  list_id: number;
  }
  export interface TodoList {
    id: number;
    title: string;
  }
  
  export type TodoLists = TodoList[];
  
  export type TaskList = Task[];