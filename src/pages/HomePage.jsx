import { useQuery } from "@tanstack/react-query";
import usePosts from "../hooks/usePosts";
import PostList from "../components/Feed/PostList";
import AddPost from "../components/feed/AddPost";

const HomePage = () => {
  const { data: posts, error, status, isLoading } = usePosts();
  console.log(posts, "posts");
  return (
    <>
      <AddPost />
      <PostList posts={posts} isLoading={isLoading} />
    </>
  );
};

export default HomePage;
