import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUserProfileStore } from "../../store/userProfileStore";

const ProfileHead = () => {
  const user = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  console.log(user, "headeruser");
  console.log(userProfile, "userprofileheader");
  const ownProfile = user?.username === userProfile?.username;
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);

  return (
    <div className="flex items-start gap-8  md:gap-16">
      <Avatar
        alt={userProfile?.username}
        sx={{
          border: "solid #71717a",
          width: { xs: 150, sm: 200 },
          height: { xs: 150, sm: 200 },
        }}
        src={userProfile?.profilePicURL}
      />
      {/* side contents  */}
      <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl text-zinc-300">{userProfile?.username}</h1>
          {ownProfile ? (
            <button
              onClick={() => navigate("/editprofile")}
              type="button"
              className="bg-zinc-800 hover:bg-zinc-900 rounded-lg px-4 py-1"
            >
              Edit profile
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-900 rounded-lg px-4 py-1"
              onClick={() => setFollow(!follow)}
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="flex gap-2 md:gap-4 text-sm font-semibold">
          <span>{userProfile?.posts?.length} posts</span>
          <span> {userProfile?.followers?.length} followers</span>
          <span>{userProfile?.following?.length} following</span>
        </div>
        <div>
          <h2>{userProfile?.fullName}</h2>
        </div>
        <div>
          <p className="text-sm">{userProfile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
