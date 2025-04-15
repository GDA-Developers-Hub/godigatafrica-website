import React from "react";
import { X, Trash2, Sun, LogOut, HelpCircle } from "lucide-react";

const Settings = ({ onClose, onDeleteChats, onThemeToggle, onLogout }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Settings
        </h2>
        <div className="space-y-4">
          <button
            onClick={onDeleteChats}
            className="flex items-center gap-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            <Trash2 className="h-5 w-5" />
            Delete All Chats
          </button>
          <button
            onClick={onThemeToggle}
            className="flex items-center gap-2 p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded"
          >
            <Sun className="h-5 w-5" />
            Change Theme
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
          <button
            onClick={() => alert("Help section coming soon!")}
            className="flex items-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            <HelpCircle className="h-5 w-5" />
            Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
