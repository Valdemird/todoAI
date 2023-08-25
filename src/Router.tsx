import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound, TaskListPage, TodoListPage } from "./pages";

const paths = {
  taskList: "/list/:todoListId/",
  root: "/",
  about: "about",
  error404: "*",
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
    path: paths.error404,
    element: <NotFound />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
