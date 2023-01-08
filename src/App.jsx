import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import ContextProvider from "./contexts/ContextProvider";
import router from "./Routes/routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <RouterProvider router={router} />
          </ContextProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  );
}
export default App;
