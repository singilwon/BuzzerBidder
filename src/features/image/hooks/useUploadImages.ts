import { useState } from "react";
import { uploadImage } from "../services/uploadImage.service";

export const useUploadImages = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImages = async (files: File[], directory: string): Promise<string[]> => {
    if (files.length === 0) return [];

    setIsUploading(true);

    try {
      return await Promise.all(files.map(file => uploadImage(file, directory)));
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImages, isUploading };
};
