import React, { useState } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Avatar, Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthStore } from "../../store/authStore";
import useDayjs from "../../hooks/useDayjs";
import useLikePost from "../../hooks/useLikePost";
import CardOnly from "./CardOnly";

const UserCard = ({ posts, Loading }) => {

  const ownProfile = useAuthStore((state) => state.user);
  console.log(ownProfile, "ownprofile");
  const ownPosts = posts?.filter((post) => post?.authorId === ownProfile?.uid);
  console.log(ownPosts, "ownposts");
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex justify-center items-center text-sm space-x-2">
        <ViewModuleIcon />
        <span className="font-semibold">POSTS</span>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {ownPosts?.map((post, index) => (
          <CardOnly post={post} key={post?.postId} ownProfile={ownProfile} />
        ))}
      </div>
    </div>
  );
};

export default UserCard;
