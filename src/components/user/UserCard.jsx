import React, { useState } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Avatar, Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";

const UserCard = ({ posts, isloading }) => {
  const options = ["Follow", "View profile"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(5000);
  const handleLikes = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };
  const [visibleComments, setVisibleComments] = useState({});
  const toggleComments = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle visibility for the specific post
    }));
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex justify-center items-center text-sm space-x-2">
        <ViewModuleIcon />
        <span className="font-semibold">POSTS</span>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-4">
        {posts?.map((post, index) => (
          <div className="bg-zinc-900 p-4 rounded-lg shadow-md md:w-[500px] max-h-full text-white" key={index}>
            {/* <!-- User Info with Three-Dot Menu --> */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 h-full w-full">
                <Avatar
                  alt="Jane Sharp"
                  src="https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg"
                />
                <div>
                  <p className="font-semibold">Jane</p>
                  <p className="text-zinc-500 text-sm">Posted 2 hours ago</p>
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
              <p className="text-zinc-300">
                Feeling fresh and fine!
                <br />
                <a href="" className="text-blue-400">
                  #Beauty
                </a>
              </p>
            </div>
            {/* <!-- Image --> */}
            <div className="mb-4 w-full md:h-[350px] border border-zinc-800 bg-black flex items-center justify-center rounded-md overflow-hidden">
              <img
                src="https://imgv3.fotor.com/images/slider-image/A-blurry-close-up-photo-of-a-woman.jpg"
                alt="Post Image"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            {/* <!-- Like and Comment Section --> */}
            <div className="flex flex-col justify-between text-gray-400">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLikes}
                  className="flex justify-center items-center gap-2 px-2 hover:bg-zinc-800 rounded-full p-1"
                >
                  {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex justify-center items-center gap-2 px-2 hover:bg-zinc-800 rounded-full p-1"
                >
                  <CommentIcon />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span>{likes} likes</span>
                <span
                  className="cursor-pointer"
                  onClick={() => toggleComments(post.id)}
                >
                  View all 2000 comments
                </span>
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
            <div className={`${visibleComments[post.id] ? "block" : "hidden"}`}>
              <hr className="mt-2 mb-2" />
              <p className="text-zinc-400 font-semibold">Comment</p>
              <hr className="mt-2 mb-2" />
              <div className="mt-4">
                {/* <!-- Comment 1 --> */}
                <div className="flex items-center space-x-2">
                  <img
                    src="https://placekitten.com/32/32"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-gray-300 font-semibold">Jane Smith</p>
                    <p className="text-gray-400 text-sm">Lovely shot! 📸</p>
                  </div>
                </div>
                {/* <!-- Reply from John Doe with indentation --> */}
                <div className="flex items-center space-x-2 mt-2 ml-6">
                  <img
                    src="https://placekitten.com/40/40"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-gray-300 font-semibold">John Doe</p>
                    <p className="text-gray-400 text-sm">
                      That little furball is from a local shelter. You should
                      check it out! 🏠😺
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
