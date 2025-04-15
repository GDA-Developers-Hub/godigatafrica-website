"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Click here to start typing...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Focus the editor on mount to ensure buttons work with one click
  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    }
  }, [editor]);

  if (!editor) return null;

  const handleButtonClick = (action) => {
    // Ensure editor is focused before applying the action
    editor.commands.focus();
    action();
  };

  return (
    <div className="w-full space-y-2 rounded-lg p-4 bg-[#0f172a]">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 bg-[#1e293b] rounded-md">
        <button
          type="button"
          onClick={() =>
            handleButtonClick(() => editor.chain().toggleBold().run())
          }
          className={`w-10 h-10 flex items-center justify-center rounded ${
            editor.isActive("bold") ? "bg-[#334155]" : "bg-[#1e293b]"
          } text-white border border-[#334155] hover:bg-[#334155] transition-colors`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() =>
            handleButtonClick(() => editor.chain().toggleItalic().run())
          }
          className={`w-10 h-10 flex items-center justify-center rounded ${
            editor.isActive("italic") ? "bg-[#334155]" : "bg-[#1e293b]"
          } text-white border border-[#334155] hover:bg-[#334155] transition-colors`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().toggleHeading({ level: 1 }).run()
            )
          }
          className={`w-10 h-10 flex items-center justify-center rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-[#334155]"
              : "bg-[#1e293b]"
          } text-white border border-[#334155] hover:bg-[#334155] transition-colors`}
        >
          H<sub>1</sub>
        </button>
        <button
          type="button"
          onClick={() =>
            handleButtonClick(() =>
              editor.chain().toggleHeading({ level: 2 }).run()
            )
          }
          className={`w-10 h-10 flex items-center justify-center rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-[#334155]"
              : "bg-[#1e293b]"
          } text-white border border-[#334155] hover:bg-[#334155] transition-colors`}
        >
          H<sub>2</sub>
        </button>
      </div>

      {/* Editor Container */}
      <div className="relative">
        <div className="border border-[#334155] rounded-md bg-[#1e293b] overflow-hidden">
          <div className="p-4 min-h-[230px]">
            <EditorContent
              editor={editor}
              className="prose prose-invert prose-sm max-w-none focus:outline-none text-white h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
