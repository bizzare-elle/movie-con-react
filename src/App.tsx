import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { queryClient } from "./components/Home";
import Home from "./components/Home";
import "./index.css";

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Home />
        <footer className="w-full bg-[#b94b7f] text-white py-10 px-[200px] flex justify-between items-center">
          <span className="font-bold text-[20px]">MovieCon</span>
          <span className="text-sm">All rights reserved, 2024</span>
        </footer>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
