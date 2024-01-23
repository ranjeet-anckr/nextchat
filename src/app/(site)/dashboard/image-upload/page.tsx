import { LucideLayoutDashboard } from "lucide-react";
import React from "react";
import ImageUploadForm from "./components/ImageUploadForm";

const ImageUpload = () => {
  return (
    <div className="container">
      <div className="flex flex-col flex-1 space-y-8">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold flex space-x-4 items-center">
            <LucideLayoutDashboard className="w-5 h-5" />

            <span>Upload Image</span>
          </h1>
        </div>
        <ImageUploadForm/>
      </div>
    </div>
  );
};

export default ImageUpload;
