import { useQuery } from "@tanstack/react-query";
import fetchPosts from "../apiLayer/fetch/fetchPosts";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
};

export default usePosts;
