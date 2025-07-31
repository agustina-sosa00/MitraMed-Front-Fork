// import React from 'react';
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import { DropboxProvider } from "./context/DropboxContext";
import { MedicalHistoryProvider } from "./context/MedicalHistoryContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <MedicalHistoryProvider>
      <DropboxProvider>
        <App />
      </DropboxProvider>
    </MedicalHistoryProvider>

    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
