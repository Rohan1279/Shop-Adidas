import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import ContextProvider from "./contexts/ContextProvider";
import router from "./Routes/routes";
import { Toaster } from "react-hot-toast";
import Disclaimer from "./Shared/Disclaimer";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <RouterProvider router={router} />
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                success: {
                  className:
                    "bg-gray-100 shadow-nm px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider select-none",
                  // duration: 62000,
                  style: {
                    padding: "16px",
                    color: "",
                    backdropFilter: "",
                  },
                },
                error: {
                  className:
                    "bg-gray-100 shadow-nm px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider select-none",
                  duration: 1000,
                  style: {
                    padding: "16px",
                    color: "#e63946",
                    backdropFilter: "",
                  },
                },
              }}
            ></Toaster>
          </ContextProvider>
        </QueryClientProvider>
        <Disclaimer />
      </React.StrictMode>
    </div>
  );
}
export default App;
