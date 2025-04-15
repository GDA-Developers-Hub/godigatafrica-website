import React from "react";
import ChatInterface from "../Components/ChatInterface";
import { ThemeProvider } from "../Hooks/ThemeProvider";
import Header from "./Header";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex flex-col h-screen bg-gray-100 dark:bg-gray-600">
        <Header />
        <div className="flex-grow w-full">
          <ChatInterface />
        </div>
      </main>
    </ThemeProvider>
  );
}
