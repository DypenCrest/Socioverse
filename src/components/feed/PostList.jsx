import { Skeleton } from "@mui/material";
import React from "react";
import Post from "./Post";

const PostList = ({
  posts,
  isLoading,
  error,
  postAuth,
  onLoading,
  postList,
}) => {
  console.log(posts, "props");
  console.log(postList, "propList");

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        {isLoading &&
          [0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-4 rounded-lg shadow-md md:w-[500px] max-h-full text-white flex flex-col gap-4"
            >
              <div className="flex items-center space-x-2 h-full w-full">
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
                <div>
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                    width={100}
                    animation="wave"
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.800" }}
                    variant="text"
                    width={150}
                    animation="wave"
                  />
                </div>
              </div>
              <div className=" overflow-hidden">
                <Skeleton
                  sx={{ bgcolor: "grey.800", width: "100%", height: "80px" }}
                  variant="rounded"
                  animation="wave"
                />
              </div>
              <div className=" overflow-hidden">
                <Skeleton
                  sx={{ bgcolor: "grey.800", width: "100%", height: "250px" }}
                  variant="rounded"
                  animation="wave"
                />
              </div>
              <div>
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  variant="text"
                  width={120}
                  animation="wave"
                />
                <Skeleton
                  sx={{ bgcolor: "grey.800" }}
                  variant="text"
                  width={200}
                  animation="wave"
                />
              </div>
            </div>
          ))}
        {postList?.map((post) => {
          return <Post key={post?.id} postData={post} postAuth={postAuth} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
