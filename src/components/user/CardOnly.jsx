import React, { useState } from "react";
import useLikePost from "../../hooks/useLikePost";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import useDayjs from "../../hooks/useDayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";

const CardOnly = ({ post, ownProfile }) => {
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const options = ["Follow", "View profile"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md md:w-[500px] max-h-full text-white">
      {/* <!-- User Info with Three-Dot Menu --> */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 h-full w-full">
          <Avatar alt={ownProfile?.username} src={ownProfile?.profilePicURL} />
          <div>
            <p className="font-semibold">{ownProfile?.username}</p>
            <p className="text-zinc-500 text-sm">{useDayjs(post?.createdAt)}</p>
          </div>
        </div>
        <div className="text-zinc-300 cursor-pointer">
          <IconButton
            color="inherit"
            className="hover:text-purple-500"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  color: "#d4d4d8",
                  boxShadow: "none",
                  backgroundColor: "#27272a",
                  paddingInline: "5px",
                },
              },
            }}
          >
            {options.map((option, idx) => (
              <MenuItem
                key={idx}
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#424245",
                  },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {/* <!-- description --> */}
      <div className="mb-4">
        <p className="text-zinc-300">{post?.caption}</p>
      </div>
      {/* <!-- Image --> */}
      {post?.imageURL && (
        <div className="mb-4 w-full md:h-[350px] border border-zinc-800 bg-black flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={post?.imageURL}
            alt="Post Image"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      )}

      {/* <!-- Like and Comment Section --> */}
      <div className="flex flex-col justify-between text-gray-400">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLikePost}
            className="flex justify-center items-center gap-2 px-2 hover:bg-zinc-800 rounded-full p-1"
          >
            {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span>{likes} likes</span>
        </div>
      </div>
      {/* leave Comment */}
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          className="mt-4 bg-transparent w-full focus:outline-none border-b border-zinc-700"
        />
      </div>
    </div>
  );
};

export default CardOnly;
