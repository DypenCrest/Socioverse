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

  return (
    <>
      <AddPost />
      <PostList
        posts={allPost}
        postList={posts}
        isLoading={isLoading}
        onLoading={Loading}
        error={error}
      />
    </>
  );
};

export default HomePage;
