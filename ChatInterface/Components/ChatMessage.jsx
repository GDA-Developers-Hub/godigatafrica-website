import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";


function ChatMessage({ message }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);

  const hasReasoning = message.content.includes("<Thinking>");
  let reasoning = "";
  let content = message.content;

  if (hasReasoning) {
    const thinkingMatch = message.content.match(/<Thinking>([\s\S]*?)<\/Thinking>/);
    if (thinkingMatch && thinkingMatch[1]) {
      reasoning = thinkingMatch[1].trim();
      content = message.content.replace(/<Thinking>[\s\S]*?<\/Thinking>/, "").trim();
    }
  }

  const isUser = message.role === "user";
  const isTyping = message.typing; 

  useEffect(() => {
    if (isUser) {
      setDisplayedContent(content);
      setIndex(0);
      return;
    }

    if (!isUser && index === 0) {
      setDisplayedContent(""); 
    }

    if (!isUser && index < content.length) {
      const typingInterval = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(typingInterval);
    }
  }, [isUser, index, content]);

  const bubbleClass = isUser
    ? "bg-blue-500 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg rounded-tr-none"
    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-none";

  const label = isUser ? "You" : "Assistant";
  const labelPositionClass = isUser ? "absolute top-0 right-0" : "absolute top-0 left-0";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`relative p-4 shadow max-w-[80%] ${bubbleClass}`}>
        <div className={`text-xs font-semibold text-gray-200 ${labelPositionClass} p-1`}>
          {label}
        </div>

        {isTyping && !isUser && index < content.length ? (
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {displayedContent || "Thinking..."}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {displayedContent || "..."}
            </ReactMarkdown>
          </div>
        )}

        {/* Reasoning block for AI messages */}
        {hasReasoning && !isUser && showReasoning && (
          <div className="mb-2 p-3 bg-gray-800 text-gray-100 rounded">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {reasoning}
            </ReactMarkdown>
          </div>
        )}

        {/* Button to toggle reasoning visibility for AI messages */}
        {hasReasoning && !isUser && (
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            {showReasoning ? "Hide Reasoning" : "Show Reasoning"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
