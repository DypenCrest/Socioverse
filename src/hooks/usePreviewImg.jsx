import { useState } from "react";
import { toast } from "react-toastify";

const usePreviewImg = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const maxFileSize = 5 * 1024 * 1024;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxFileSize) {
        toast.error("File size must be 5MB or less");
        setSelectedImg(null);
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image");
    }
  };
  return [selectedImg, setSelectedImg, handleImageChange];
};

export default usePreviewImg;
