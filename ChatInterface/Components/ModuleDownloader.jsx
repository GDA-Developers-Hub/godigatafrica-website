"use client";
import React, { useState } from "react";
import JSZip from "jszip";
import { Icons } from "./icons";
import { useToast } from "../Hooks/use-toast";

export function ModuleDownloader({ messages }) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setErrorMessage(null);

    try {
      const lastAssistantMessage = messages.filter((msg) => msg.role === "assistant").pop();
      if (!lastAssistantMessage) {
        setErrorMessage("No module has been generated yet.");
        return;
      }
      const codeBlocks = Array.from(
        lastAssistantMessage.content.matchAll(/```([a-z]+)\s+file="([^"]+)"\n([\s\S]+?)```/g)
      ).map((match) => ({
        language: match[1],
        filename: match[2],
        code: match[3],
      }));

      if (codeBlocks.length === 0) {
        setErrorMessage("No module code available for download.");
        return;
      }

      const zip = new JSZip();
      codeBlocks.forEach((block) => {
        zip.file(block.filename, block.code);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "software_module.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Module Downloaded",
        description: "Your module has been downloaded successfully.",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to download the module. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h5 className="text-xl font-bold mb-4 text-white dark:text-gray-800">Download Module</h5>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Download the generated module as a zip file.</p>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <button
        onClick={handleDownload}
        disabled={isDownloading || messages.filter((m) => m.role === "assistant").length === 0}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {isDownloading ? (
          <span className="flex items-center justify-center">
            <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
            Downloading...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Icons.download className="h-5 w-5 mr-2" />
            Download Module
          </span>
        )}
      </button>
    </div>
  );
}

export default ModuleDownloader;
