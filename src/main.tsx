import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./Router"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:6000
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>  
    <QueryClientProvider client={queryClient}>
      <Router/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
