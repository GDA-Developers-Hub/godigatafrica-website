"use client";
import React, { useState } from "react";
import { Icons } from "./icons";
import { useToast } from "../Hooks/use-toast";

export function ImageUploader({ onUpload }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File too large. Please upload an image smaller than 5MB.");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      onUpload(data.url);

      toast({
        title: "Upload Successful",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h5 className="text-xl font-bold mb-4 text-white dark:text-gray-800">Upload Image</h5>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Upload a screenshot or diagram for analysis.</p>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      {preview ? (
        <div className="relative border rounded p-2 mb-4">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-auto rounded" />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
          >
            <Icons.trash className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border border-dashed border-gray-400 dark:border-gray-600 rounded p-6 cursor-pointer mb-4">
          <Icons.upload className="h-8 w-8 mb-2 text-gray-500" />
          <span className="text-gray-500">Click to upload or drag & drop</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
        </label>
      )}
      <button
        onClick={() => setPreview(null)}
        disabled={isUploading || !preview}
        className="w-full bg-gray-500 dark:bg-blue-600 hover:bg-gray-600 border-blue-600 dark:hover:bg-gray-600  text-white py-2 rounded disabled:opacity-50"
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
            Uploading...
          </span>
        ) : (
          "Clear"
        )}
      </button>
    </div>
  );
}

export default ImageUploader;