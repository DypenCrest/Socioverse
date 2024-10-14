import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const useLikePost = (postData) => {
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(postData?.likes?.length);
  const [isLiked, setIsLiked] = useState(
    postData?.likes?.includes(authUser?.uid)
  );
  const handleLikePost = async () => {
    const postDocRef = doc(firestore, "posts", postData?.postId);
    try {
      await updateDoc(postDocRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { handleLikePost, likes, isLiked };
};

export default useLikePost;
