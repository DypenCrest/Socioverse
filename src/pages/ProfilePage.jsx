import React from "react";
import ProfileHead from "../components/user/ProfileHead";
import UserCard from "../components/user/UserCard";
import usePosts from "../hooks/usePosts";
import { useParams } from "react-router-dom";
import useProfileByUsername from "../hooks/useProfileByUsername";
import { Skeleton } from "@mui/material";

const ProfilePage = () => {
  const { data: posts } = usePosts();
  const { username } = useParams();
  console.log(username, "params");
  const { isLoading, userProfile } = useProfileByUsername(username);

  return (
    <div className="flex-col justify-center py-12 px-2 md:px-16 space-y-8">
      {!isLoading && userProfile && <ProfileHead />}
      {isLoading && (
        <div className="flex items-start gap-8  md:gap-16">
          <Skeleton
            variant="circular"
            sx={{ bgcolor: "grey.800" }}
            width={200}
            height={200}
          />
          {/* side contents  */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
                width={200}
                height={50}
              />
            </div>
            <div className="flex gap-2 md:gap-4 text-sm font-semibold">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
                width={150}
              />
            </div>
            <div>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
                width={100}
              />
            </div>
          </div>
        </div>
      )}

      <hr />
      <UserCard posts={posts} />
    </div>
  );
};

export default ProfilePage;
