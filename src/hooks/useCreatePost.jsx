import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { firestore, storage } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "react-toastify";

const useCreatePost = () => {
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const createPost = async (caption, selectedImg) => {
    const postData = {
      postId: "",
      caption: caption,
      likes: ["test"],
      imageURL: "",
      createdAt: new Date(),
      authorId: authUser.uid,
    };
    try {
      setIsLoading(true);
      const postDocRef = await addDoc(collection(firestore, "posts"), postData);
      const postId = postDocRef.id;
      await updateDoc(postDocRef, { postId: postId });
      if (selectedImg) {
        const imageRef = ref(storage, `postImages/${postId}`);
        await uploadString(imageRef, selectedImg, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }

      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, { posts: arrayUnion(postId) });

      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [createPost, isLoading];
};

export default useCreatePost;
