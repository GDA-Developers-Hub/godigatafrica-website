"use client"

import { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import Assistant from "../../ChatInterface/App/Assistant"

function Ai() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("aiAssistantOpen") === "true"
  })
  const [showBubble, setShowBubble] = useState(() => {
    return localStorage.getItem("chatBubbleClosed") !== "true"
  })

  useEffect(() => {
    localStorage.setItem("aiAssistantOpen", isOpen)
  }, [isOpen])

  const toggleAssistant = () => {
    setIsOpen((prev) => !prev)
  }

  const closeBubble = () => {
    setShowBubble(false)
    localStorage.setItem("chatBubbleClosed", "true")
  }

  return (
    <>
      {showBubble && (
        <div className="fixed bottom-20 right-4 z-[9997]">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-500 p-5 rounded-xl shadow-lg border border-gray-100">
            <p className="text-3xl text-white font-bold">Chat with GDAI, our AI Assistant</p>
            <button
              onClick={closeBubble}
              className="absolute top-2 right-2 text-red-500 hover:text-gray-700 transition-colors bg-amber-400 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="absolute bottom-[-8px] right-1 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-amber-300"></div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleAssistant}
          className="bg-gradient-to-r from-blue-600 to-amber-300 hover:from-blue-700 hover:to-amber-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300 relative"
        >
          <MessageSquare className="w-6 h-6 text-amber-50" />
          <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-25"></span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <Assistant onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  )
}

export default Ai
