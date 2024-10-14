import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import usePostStore from "../store/usePostStore";
import { firestore } from "../firebase/firebase";

const useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      const q = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc")
      );
      try {
        const querySnapshot = await getDocs(q);
        let feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(feedPosts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFeedPosts();
  }, [setPosts]);

  return { isLoading, posts };
};

export default useGetFeedPost;
