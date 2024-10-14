import { useQuery } from "@tanstack/react-query";
import PostList from "../components/feed/PostList";
import AddPost from "../components/feed/AddPost";
import usePosts from "../hooks/usePosts";
import fetchUserDetail from "../apiLayer/fetch/fetchUserDetail";
import useGetFeedPost from "../hooks/useGetFeedPost";

const HomePage = () => {
  const { data: allPost, error, isLoading } = usePosts();

  const { isLoading: Loading, posts } = useGetFeedPost();
  console.log(posts, "posts");
  const { data: postAuth } = useQuery({
    queryKey: ["user-detail"],
    queryFn: () => fetchUserDetail("Jrn7xalpTSMwJJgKkmH2jNRUUaQ2"),
  });

  return (
    <>
      <AddPost />
      <PostList
        posts={allPost}
        postList={posts}
        isLoading={isLoading}
        onLoading={Loading}
        error={error}
        postAuth={postAuth}
      />
    </>
  );
};

export default HomePage;
