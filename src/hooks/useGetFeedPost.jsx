import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { firestore } from "../firebase/firebase";

const fetchFeedPosts = async () => {
  const q = query(collection(firestore, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  let feedPosts = [];
  querySnapshot.forEach((doc) => {
    feedPosts.push({ id: doc.id, ...doc.data() });
  });
  return feedPosts;
};

const useGetFeedPost = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feed-posts"], // Query key for invalidation
    queryFn: fetchFeedPosts, // Fetch function
    onError: (error) => {
      toast.error(error.message); // Handle errors
    },
  });

  return { isLoading, posts, isError };
};

export default useGetFeedPost;
