export interface Task {
  id: string;
  value: string;
  order: number;
  list_id: number;
  }

  export interface TodoList {
    id: number;
    title: string;
  }
  
  export type TodoLists = TodoList[];
  
  export type TaskList = Task[];