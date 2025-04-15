import React from "react";
import { X, PlusCircle, Settings, MoreHorizontal } from "lucide-react";
import Swal from "sweetalert2";

const ChatSidebar = ({
  conversations,
  showSidebar,
  onClose,
  onNewChat,
  onOpenSettings,
  onDeleteConversation,
  onSelectConversation, 
}) => {
  const handleDeleteClick = (convId) => {
    Swal.fire({
      title: "Delete Conversation?",
      text: "Are you sure you want to delete this conversation? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (onDeleteConversation) {
          onDeleteConversation(convId);
        } else {
          console.log("Delete conversation id:", convId);
        }
      }
    });
  };

  return (
    <div
      className={`
        ${showSidebar ? "block" : "hidden"} 
        md:block
        fixed md:relative top-0 left-0 
        h-full w-[300px] p-4 
        bg-gray-50 dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-700 
        z-50 flex flex-col
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-end">
        <button onClick={onClose} className="p-2">
          <X className="h-6 w-6" />
        </button>
      </div>

      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        Conversations
      </h2>

      {/* Conversations List */}
      <ul className="flex-grow overflow-auto">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className="group relative mb-2 p-2 bg-white dark:bg-gray-800 rounded hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer text-gray-800 dark:text-white"
            onClick={() => onSelectConversation && onSelectConversation(conv.id)}
          >
            {conv.id || "Default Conversation Title"}
            {/* Delete button appears on hover */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(conv.id);
              }}
              className="hidden group-hover:block absolute top-1 right-1 text-gray-500 hover:text-red-500"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom Buttons */}
      <div className="absolute bottom-0 left-0 w-full pt-4 border-t border-gray-200 dark:border-gray-700 z-50 bg-gray-50 dark:bg-gray-900">
        <div className="flex gap-2 p-4">
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            <PlusCircle className="h-5 w-5" />
            New Chat
          </button>
          <button
            onClick={onOpenSettings}
            className="flex-1 flex items-center justify-center gap-2 p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded"
          >
            <Settings className="h-5 w-5" />
            Settings
          </button>
          
        </div>
        <small className="text-xs text-gray-300 dark:text-gray-400 mb-6 mx-4">Powered by Open AI's GPT-4o model</small>
      </div>
    </div>
  );
};

export default ChatSidebar;
