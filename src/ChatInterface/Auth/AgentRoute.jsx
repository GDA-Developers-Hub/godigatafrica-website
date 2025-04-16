import { Navigate } from "react-router-dom";
import { useAgentAuth } from "./AgentAuthContext";

// Protected route component
const AgentRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAgentAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/agent-login" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default AgentRoute; 