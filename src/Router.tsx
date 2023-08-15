import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TaskListPage from "./TaskListPage.tsx";
import TodoListPage from "./TodoListPage.tsx";

const paths = {
  taskList: "/list/:todoListId/",
  root: "/",
  about: "about",
};

const router = createBrowserRouter([
  {
    path: paths.taskList,
    element: <TaskListPage />,
  },
  {
    path: paths.root,
    element: <TodoListPage />,
  },
  {
    path: paths.about,
    element: <div>About</div>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
