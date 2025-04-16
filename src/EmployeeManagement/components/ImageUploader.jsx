import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkJk4gi5Z8uTmvdxA-kJUaJJv0BdjMO98",
  authDomain: "automotive-5f3b5.firebaseapp.com",
  projectId: "automotive-5f3b5",
  storageBucket: "automotive-5f3b5.appspot.com",
  messagingSenderId: "958347590694",
  appId: "1:958347590694:web:748f45eb4a170a21a8fae7",
  measurementId: "G-LX9ZPTD8X3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ImageUploader = ({ onSaveUrl, existingUrl = "" }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingUrl);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
    try {
      const storageRef = ref(storage, `go-digital-africa/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
  
      if (onSaveUrl) {
        await onSaveUrl(url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer border-2 border-slate-600 text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition">
        Upload Image
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </label>
      {uploading && <p className="text-slate-400">Uploading image...</p>}
    </div>
  );
};

export default ImageUploader; 