"use client"
import useSupabase from '@/lib/supabase/use-supabase';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient('http://localhost:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
const ImageUploadForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase.storage.from('images').upload("hello", imageFile);
    console.log(data)
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-gray-100 rounded-md">
      <label className="block text-lg font-semibold mb-2">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />
      {image && (
        <img src={image} alt="Preview" className="mb-4 rounded-md shadow-md max-h-40 object-cover" />
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </form>
  );
};

export default ImageUploadForm;
