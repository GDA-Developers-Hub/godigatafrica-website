import {React, useEffect} from "react";
import ThemeProvider from "./Utils/ThemeProvider";
import AppRoutes from "./AppRoutes";
import { cleanupOldConversations } from "./Utils/ChatCleanup";
import { HelmetProvider } from 'react-helmet-async';

function App() {

  useEffect(() => {
    cleanupOldConversations();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppRoutes/>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
