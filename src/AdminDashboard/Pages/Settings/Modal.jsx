// Modal.jsx - a reusable modal component
import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}